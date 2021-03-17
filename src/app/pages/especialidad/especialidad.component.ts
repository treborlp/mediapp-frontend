import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from '../../_model/especialidad';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EspecialidadService } from '../../_service/especialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  displayedColumns: string[] = ['idEspecialidad', 'nombre', 'descripcion',  'acciones'];
  dataSource : MatTableDataSource<Especialidad>;

  @ViewChild(MatPaginator) paginator : MatPaginator; //Referenciamos el paginador
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private especialidadService: EspecialidadService,
    private snackBar: MatSnackBar,
    public route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
     //Inicamos la carga de datos en la tabla
     this.especialidadService.listar().subscribe(data =>{
      this.iniciarTabla(data);
    });

    //Escuchamos los cambios reactivosa
    this.especialidadService.getMensajeCambio().subscribe(mensaje =>{
      this.snackBar.open(mensaje, "Aviso", {duration: 2000});
    });

    //Cuando los registros cambian
    this.especialidadService.getEspecialidadCambio().subscribe(especiNuevos=>{
      this.iniciarTabla(especiNuevos);
    })
  }

  eliminar(idEspecialidad: number){
    this.especialidadService.eliminar(idEspecialidad).pipe(switchMap(()=>{
      return this.especialidadService.listar();
    })).subscribe((data)=>{
      this.especialidadService.setEspecialidadCambio(data);
      this.especialidadService.setMensajeCambio("Especialidad Eliminado")
    })
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }

  iniciarTabla(especialidades: Especialidad[]){
    this.dataSource = new MatTableDataSource(especialidades);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
