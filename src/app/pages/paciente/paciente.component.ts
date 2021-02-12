import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from '../../_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource : MatTableDataSource<Paciente>;



  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.listar().subscribe(paciente => this.dataSource = new MatTableDataSource(paciente))
  }

}
