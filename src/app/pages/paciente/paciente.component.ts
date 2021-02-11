import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.listar().subscribe(paciente => console.log(paciente))
  }

}
