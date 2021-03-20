import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from '../../_model/paciente';
import { PacienteService } from '../../_service/paciente.service';

@Component({
  selector: 'app-consulta-especial',
  templateUrl: './consulta-especial.component.html',
  styleUrls: ['./consulta-especial.component.css']
})
export class ConsultaEspecialComponent implements OnInit {

  form: FormGroup;
  pacientes: Paciente[];

  //Utiles para el autocomplete
  myControlPaciente: FormControl = new FormControl(); 
  myControlMedico: FormControl = new FormControl(); 

  pacientesFiltrados$: Observable<Paciente[]>; 

  constructor(
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'paciente': this.myControlPaciente,
      'especialidad': new FormControl(),
      'medico': this.myControlMedico,
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    })
  this.listarPacientes();
  this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));



  }

  filtrarPacientes(val: any){
    if(val!=null && val.idPaciente>0){
      return this.pacientes.filter(el => 
        el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()))
    }

    return this.pacientes.filter(el => 
      el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidos.toLowerCase().includes(val?.toLowerCase()))
    
  }

  listarPacientes(){
    this.pacienteService.listar().subscribe(pacientes => this.pacientes = pacientes);
  }

  aceptar(){

  }

}
