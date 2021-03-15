import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from '../../_service/medico.service';

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

  constructor(private medicoService: MedicoService) {

   }

  ngOnInit(): void {
    this.medicoService.listar().subscribe(medicos =>{
      this.dataSource = new MatTableDataSource(medicos);
    })
  }

  
  abrirDialogo(medico?: Medico){ //El signo ? limita la restriccion del medico
    
  }
  
  eliminarMedico(medico?: Medico){
    
  }
  
  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }
}
