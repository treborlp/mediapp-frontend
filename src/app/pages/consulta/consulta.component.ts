import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../_model/paciente';
import { PacienteService } from '../../_service/paciente.service';
import { Medico } from 'src/app/_model/medico';
import { Especialidad } from '../../_model/especialidad';
import { Examen } from '../../_model/examen';
import { MedicoService } from '../../_service/medico.service';
import { EspecialidadService } from '../../_service/especialidad.service';
import { ExamenService } from '../../_service/examen.service';
import { DetalleConsulta } from '../../_model/detalle-consulta';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Consulta } from '../../_model/consulta';
import * as moment from 'moment';
import { ConsultaListaExamenDTO } from '../../_dto/consulta-lista-examen-dto';
import { ConsultaService } from '../../_service/consulta.service';

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

  //Detalle Consulta
  diagnostico: string;
  tratamiento: string;

  detalleConsulta: DetalleConsulta[]=[]; //Inicializamos el arreglo de detalle consulta
  listaExamenes: Examen[]=[];

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
    private examenService: ExamenService,
    private consultaListDTOService: ConsultaService,
    private snackBar: MatSnackBar
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

  agregarDetalle(){
    if((this.tratamiento!=null || this.tratamiento!=undefined) && (this.diagnostico!=null || this.diagnostico!=undefined) ){
      let detalle=new DetalleConsulta();
      detalle.tratamiento = this.tratamiento;
      detalle.diagnostico = this.diagnostico;
      this.detalleConsulta.push(detalle);

      this.tratamiento = '';
      this.diagnostico = '';
    }
    
  }

  eliminarDetalle(index: number){
    this.detalleConsulta.splice(index,1);
  }

  agregarExamen(){
    if(this.idExamenSeleccionado>0 && this.idExamenSeleccionado!=undefined){
      let agregar = true;
      if(this.listaExamenes.length>0){
        //Comprueba que el examen no ha sido seleccionado
        for (let index = 0; index < this.listaExamenes.length; index++) {
          if(this.idExamenSeleccionado === this.listaExamenes[index].idExamen){
            const mensaje = "El examen ya fue agregado";
            this.snackBar.open(mensaje, 'Aviso',{duration: 2000})
            agregar=false;
            break;
          }
        }
      }
      if(agregar){
        this.examenService.listarPorId(this.idExamenSeleccionado).subscribe(examen=>{
          this.listaExamenes.push(examen)
          const mensaje = "Examen agregado";
          this.snackBar.open(mensaje, 'Aviso',{duration: 2000})
        })
      }
      
    }else{
          const mensaje = "Debe seleccionar un mensaje";
          this.snackBar.open(mensaje, 'Aviso',{duration: 2000})
    }
  }

  eliminarExamen(index: number){
    this.listaExamenes.splice(index,1);
  }

  grabarConsulta(){

    
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;
    
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    
    let consulta = new Consulta();
    consulta.medico = medico;
    consulta.paciente = paciente;
    consulta.especialidad = especialidad;
    consulta.numConsultorio = "C1";
    consulta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;

   let consultaListaDTO = new ConsultaListaExamenDTO();
   consultaListaDTO.consulta = consulta;
   consultaListaDTO.lstExamen = this.listaExamenes;

   this.consultaListDTOService.registrarConsultaDTO(consultaListaDTO).subscribe(()=>{
     console.log("Registrado");
   })

 // console.log(consultaListaDTO);

  }

  // verificar(){
  //   return if(this.idPacienteSeleccionado>0 && this.idMedicoSeleccionado)
  // }



}
