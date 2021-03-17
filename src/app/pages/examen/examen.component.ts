import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamenService } from '../../_service/examen.service';
import { Examen } from '../../_model/examen';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  displayedColumns: string[] = ['idExamen', 'nombre', 'descripcion',  'acciones'];
  dataSource : MatTableDataSource<Examen>;

  @ViewChild(MatPaginator) paginator : MatPaginator; //Referenciamos el paginador
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private examenService: ExamenService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    //Inicamos la carga de datos en la tabla
    this.examenService.listar().subscribe(data =>{
      this.iniciarTabla(data);
    });

    //Escuchamos los cambios reactivosa
    this.examenService.getMensajeCambio().subscribe(mensaje =>{
      this.snackBar.open(mensaje, "Aviso", {duration: 2000});
    });

    //Cuando los registros cambian
    this.examenService.getExamenCambio().subscribe(examenesNuevos=>{
      this.iniciarTabla(examenesNuevos);
    })

  }

  eliminar(idExamen: number){
    this.examenService.eliminar(idExamen).pipe(switchMap(()=>{
      return this.examenService.listar();
    })).subscribe((data)=>{
      this.examenService.setExamenCambio(data);
      this.examenService.setMensajeCambio("Examen Eliminado")
    })
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }

  iniciarTabla(examenes: Examen[]){
    this.dataSource = new MatTableDataSource(examenes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
