import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../_model/paciente';
import { PacienteService } from '../../_service/paciente.service';
import { Medico } from 'src/app/_model/medico';
import { Especialidad } from '../../_model/especialidad';
import { Examen } from '../../_model/examen';
import { MedicoService } from '../../_service/medico.service';
import { EspecialidadService } from '../../_service/especialidad.service';
import { ExamenService } from '../../_service/examen.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  
  pacientes: Paciente[];
  medicos: Medico[];
  especialidad: Especialidad[];
  examen: Examen[];

  idPacienteSeleccionado : number;
  idMedicoSeleccionado : number;
  idEspecialidadSeleccionado : number;
  idExamenSeleccionado : number;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private pacienteService: PacienteService,
    private medicosService: MedicoService,
    private especialidadService: EspecialidadService,
    private examenService: ExamenService
    ) { }

  ngOnInit(): void {
    this.listarDatos();
  }

  listarDatos(){
    this.pacienteService.listar().subscribe(data=>this.pacientes = data);
    this.medicosService.listar().subscribe(data=>this.medicos = data);
    this.especialidadService.listar().subscribe(data=>this.especialidad = data);
    this.examenService.listar().subscribe(data=> this.examen = data);
  }

}
