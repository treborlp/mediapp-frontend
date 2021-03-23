import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Paciente } from '../../_model/paciente';
import { PacienteService } from '../../_service/paciente.service';
import { EspecialidadService } from '../../_service/especialidad.service';
import { Especialidad } from '../../_model/especialidad';
import { DetalleConsulta } from '../../_model/detalle-consulta';
import { Examen } from '../../_model/examen';
import { ExamenService } from '../../_service/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medico } from '../../_model/medico';
import { MedicoService } from '../../_service/medico.service';
import { MatStepper } from '@angular/material/stepper';
import { Consulta } from '../../_model/consulta';
import * as moment from 'moment';
import { ConsultaListaExamenDTO } from '../../_dto/consulta-lista-examen-dto';
import { ConsultaService } from '../../_service/consulta.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  //Habilita el modo linear del stepper
  isLinear: boolean = false

  primerFormGroup: FormGroup;
  segundoFormGroup: FormGroup;

  //Paciente
  pacienteSeleccionado: Paciente;
  pacientes: Paciente[]=[];
  
  //Especialidad
  especialidadSeleccionado: Especialidad;
  especialidades: Especialidad[]= [];

  //Fecha seleccionada
  fechaSeleccionada: Date;
  maxFecha: Date = new Date();

  //Detalle Examen
  diagnostico: string;
  tratamiento: string;
  detalleConsulta: DetalleConsulta[]=[];

  //Examen
  examenSeleccionado: Examen;
  examenes: Examen[];
  listaExamenes: Examen[]=[];

  //Medico
  medicoSeleccionado: Medico;
  medicos: Medico[];

  //Consultorios
  consultorioSeleccionado: number;
  consultorios: number[]=[];

  //Referencia al steper
  @ViewChild("stepper") stepper: MatStepper;

  constructor(
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private examenService: ExamenService,
    private medicosService: MedicoService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.primerFormGroup = this.formBuilder.group({
      cboPaciente : ['', Validators.required],
      fecha: ['', new FormControl(new Date(), [Validators.required])],
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl(''),
    });

    this.segundoFormGroup = this.formBuilder.group({
      elementHidden: ['', Validators.required]
    });

    this.listarPacienes();
    this.listarEspecialidades();
    this.listarExamenes();
    this.listarMedicos();
    this.listarConsultorios();

  }

  listarPacienes(){
    this.pacienteService.listar().subscribe(data=> this.pacientes = data);
  }

  listarEspecialidades(){
    this.especialidadService.listar().subscribe(data=>this.especialidades=data);
  }

  listarExamenes(){
    this.examenService.listar().subscribe(data=>this.examenes = data);
  }

  listarMedicos(){
    this.medicosService.listar().subscribe(data=>this.medicos = data);
  }

  listarConsultorios(){
    for (let index = 1; index <= 20; index++) {
      this.consultorios.push(index);
    }
  }


  seleccionarPaciente(e:any){
    this.pacienteSeleccionado = e.value
  }
  seleccionarEspecialidad(e:any){
    this.especialidadSeleccionado = e.value
  }
  seleccionarExamen(e:any){
    this.examenSeleccionado = e.value
  }

  seleccionarConsultorio(consultorio: number){
    this.consultorioSeleccionado= consultorio
  }

  agregarDetalle(event){
    event.preventDefault();
    if((this.tratamiento!=null || this.tratamiento!=undefined) && (this.diagnostico!=null || this.diagnostico!=undefined) ){
      let detalle=new DetalleConsulta();
      detalle.tratamiento = this.tratamiento;
      detalle.diagnostico = this.diagnostico;
      this.detalleConsulta.push(detalle); //El arreglo de detalle consulta debe estar vacio para prevenir los errores con metodo push

      this.tratamiento = '';
      this.diagnostico = '';
    }
  }

  eliminarDetalle(index:number){
    this.detalleConsulta.splice(index,1);
  }

  //Examen

   //Metodo para agregar Examenes
   agregarExamen(event){
    event.preventDefault();
    if(this.examenSeleccionado!=null && this.examenSeleccionado!=undefined){
      let agregar = true;
      if(this.listaExamenes.length>0){
        //Comprueba que el examen no ha sido seleccionado
        for (let index = 0; index < this.listaExamenes.length; index++) {
          if(this.examenSeleccionado.idExamen === this.listaExamenes[index].idExamen){
            const mensaje = "El examen ya fue agregado";
            this.snackBar.open(mensaje, 'Aviso',{duration: 1000})
            agregar=false;
            break;
          }
        }
      }
      if(agregar){
          this.listaExamenes.push(this.examenSeleccionado)
          const mensaje = "Examen agregado";
          this.snackBar.open(mensaje, 'Aviso',{duration: 1000})
      }
      
    }else{
          const mensaje = "Debe seleccionar un mensaje";
          this.snackBar.open(mensaje, 'Aviso',{duration: 1000})
    }
  }

  //Seleccionar Medico
  seleccionarMedico(medico: Medico){
    this.medicoSeleccionado = medico;
    this.snackBar.open("Medico Seleccionado", "Aviso", {duration: 400})
  }

  //Metodo para eliminar examenes selccionados
  eliminarExamen(index: number){
    this.listaExamenes.splice(index,1);
  }

  //Steper programatico
  nextSteper(event:any){
    event.preventDefault();
    if(this.consultorioSeleccionado>0){
      this.stepper.linear = false;
      this.stepper.next(); //Avanza el stepper
    }else{
      this.snackBar.open("Debes seleccionar un consultorio", "Aviso", {duration:600})
    }
  }

  registrarConsulta(){

     //Asignacion de objetos a la variable consulta
     let consulta = new Consulta();
     consulta.paciente = this.pacienteSeleccionado;
     consulta.medico = this.medicoSeleccionado;
     consulta.especialidad = this.especialidadSeleccionado;
     consulta.numConsultorio = `C${this.consultorioSeleccionado}`;
     consulta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
     consulta.detalleConsulta = this.detalleConsulta;
 
    let consultaListaDTO = new ConsultaListaExamenDTO();
    consultaListaDTO.consulta = consulta;
    consultaListaDTO.lstExamen = this.listaExamenes;
 
    this.consultaService.registrarConsultaDTO(consultaListaDTO).subscribe(()=>{
      setTimeout(()=>{
       this.snackBar.open("Consulta registrada", 'INFO', {duration:1000})
       this.limpiarCampos();
      },1500)
    })
  }

  limpiarCampos(){
    // this.idPacienteSeleccionado = null;
    // this.idMedicoSeleccionado = null;
    this.pacienteSeleccionado= undefined;
    this.medicoSeleccionado = undefined;
    this.especialidadSeleccionado = undefined;
    this.consultorioSeleccionado = 0;
    this.listaExamenes = [];
    this.detalleConsulta = [];
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.stepper.reset();

  }

}
