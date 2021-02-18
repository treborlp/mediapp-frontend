import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from '../../_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos','direcion',  'acciones'];
  dataSource : MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator : MatPaginator; //Referenciamos el paginador
  @ViewChild(MatSort) sort : MatSort;

TODO:-26.55
  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.pacienteCambio.subscribe(pacientes=>{
      this.crearTabla(pacientes);
    })

    this.pacienteService.listar().subscribe(pacientes => {
      this.crearTabla(pacientes);
    })
  }

  crearTabla(data: Paciente[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator //Asignamos el paginador a la tabla
    this.dataSource.sort = this.sort; // Asignamos el clasificador o sort
  }

}