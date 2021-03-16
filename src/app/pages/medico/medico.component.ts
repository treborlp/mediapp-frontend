import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from '../../_service/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

    
  displayedColumns: string[] = ['idMedico', 'nombres', 'apellidos','CMP',  'acciones'];
  dataSource : MatTableDataSource<Medico>;

  @ViewChild(MatPaginator) paginator : MatPaginator; //Referenciamos el paginador
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private medicoService: MedicoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

   }

  ngOnInit(): void {
    this.medicoService.getMedicoCambio().subscribe(data=>{
      this.crearTabla(data)
    });
    this.medicoService.listar().subscribe(medicos =>{
      this.crearTabla(medicos);
    });
    this.medicoService.getMensajeCambio().subscribe(mensaje => {
      this.snackBar.open(mensaje, "Aviso", {duration:2000})
    })
  }

  
  abrirDialogo(medico?: Medico){ //El signo ? limita la restriccion del medico
    this.dialog.open(MedicoDialogoComponent, {
      data:medico,
      width: "280px",
      height: "auto"
      
    })
  }
  
  eliminarMedico(medico?: Medico){
    
  }
  
  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }

  crearTabla(data: Medico[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator //Asignamos el paginador a la tabla
    this.dataSource.sort = this.sort; // Asignamos el clasificador o sort
  }
}
