import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from '../../_model/paciente';
import { PacienteService } from '../../_service/paciente.service';
import { MedicoService } from '../../_service/medico.service';
import { Medico } from 'src/app/_model/medico';
import { Especialidad } from '../../_model/especialidad';
import { EspecialidadService } from '../../_service/especialidad.service';
import { DetalleConsulta } from '../../_model/detalle-consulta';
import { Examen } from '../../_model/examen';
import { ExamenService } from '../../_service/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Consulta } from '../../_model/consulta';
import * as moment from 'moment';
import { ConsultaListaExamenDTO } from '../../_dto/consulta-lista-examen-dto';
import { ConsultaService } from '../../_service/consulta.service';

@Component({
  selector: 'app-consulta-especial',
  templateUrl: './consulta-especial.component.html',
  styleUrls: ['./consulta-especial.component.css']
})
export class ConsultaEspecialComponent implements OnInit {

  form: FormGroup;
  pacientes: Paciente[];
  medicos: Medico[];
  idEspecialidadSeleccionado: number;
  idExamenSeleccionado: number;

  //Lista de especialidades
  especialidad: Especialidad[];

  //Variables para la fecha de consulta
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  //Variables para el DetalleConsulta
  diagnostico: string;
  tratamiento: string

  //Arreglo para almacenar el detalle de la consulta
  detalleConsulta: DetalleConsulta[]=[];

  //Lista de exmanes disponibles
  examenes: Examen[];

  //Arreglo de examenes seleccionado;
  listaExamenes: Examen[]=[];

  //Utiles para el autocomplete
  myControlPaciente: FormControl = new FormControl(); 
  myControlMedico: FormControl = new FormControl(); 

  pacientesFiltrados$: Observable<Paciente[]>; 
  medicosFiltrados$: Observable<Medico[]>; 

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private examenService: ExamenService, 
    private snackBar: MatSnackBar,
    private consultaService: ConsultaService 
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'paciente': this.myControlPaciente,
      'medico': this.myControlMedico,
      'especialidad': new FormControl(),
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    })

    //Listando y filtrando pacientes
    this.listarPacientes();
    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
    
    //Listando y filtrando medicos
    this.listarMedicos();
    this.medicosFiltrados$ = this.myControlMedico.valueChanges.pipe(map(val => this.filtrarMedicos(val)));    
    //Listando especialidades
    this.listarEspecialidades();

    //Listando examenes
    this.listarExamenes();
  }

  filtrarPacientes(val: any){
    if(val!=null && val.idPaciente>0){
      return this.pacientes.filter(el => 
        el.nombres.toLowerCase()
                  .includes(val.nombres.toLowerCase())|| el.apellidos.toLowerCase()
                  .includes(val.apellidos.toLowerCase()))
    }

    return this.pacientes.filter(el => 
      el.nombres.toLowerCase()
                .includes(val?.toLowerCase()) || el.apellidos.toLowerCase()
                .includes(val?.toLowerCase()))
  }

  filtrarMedicos(val: any){
    if(val!=null && val.idMedico>0){
      return this.medicos.filter(el => 
        el.nombres.toLowerCase()
                  .includes(val.nombres.toLowerCase())|| el.apellidos.toLowerCase()
                  .includes(val.apellidos.toLowerCase()))
    }

    return this.medicos.filter(el => 
      el.nombres.toLowerCase()
                .includes(val?.toLowerCase()) || el.apellidos.toLowerCase()
                .includes(val?.toLowerCase()))
  }

  listarPacientes(){
    this.pacienteService.listar().subscribe(pacientes => this.pacientes = pacientes);
  }
  listarMedicos(){
    this.medicoService.listar().subscribe(medicos => this.medicos =medicos)
  }
  listarEspecialidades(){
    this.especialidadService.listar().subscribe(data => this.especialidad = data)
  }
  listarExamenes(){
    this.examenService.listar().subscribe(data => this.examenes = data)
  }

  mostratPaciente(val:Paciente){ //El valor del argumento es el objeto seleccionado
    return val? `${val.nombres} ${val.apellidos}`: val
  }

  mostratMedico(val:Medico){ //El valor del argumento es el objeto seleccionado
    return val? `${val.nombres} ${val.apellidos}`: val
  }

  //Metodo para agregar detalle de consulta
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

  //Metodo para eliminar un detalle de consulta
  eliminarDetalle(index: number){
    this.detalleConsulta.splice(index,1);
  }

  //Metodo para agregar Examenes
  agregarExamen(event){
    event.preventDefault();
    if(this.idExamenSeleccionado>0 && this.idExamenSeleccionado!=undefined){
      let agregar = true;
      if(this.listaExamenes.length>0){
        //Comprueba que el examen no ha sido seleccionado
        for (let index = 0; index < this.listaExamenes.length; index++) {
          if(this.idExamenSeleccionado === this.listaExamenes[index].idExamen){
            const mensaje = "El examen ya fue agregado";
            this.snackBar.open(mensaje, 'Aviso',{duration: 1000})
            agregar=false;
            break;
          }
        }
      }
      if(agregar){
        this.examenService.listarPorId(this.idExamenSeleccionado).subscribe(examen=>{
          this.listaExamenes.push(examen)
          const mensaje = "Examen agregado";
          this.snackBar.open(mensaje, 'Aviso',{duration: 1000})
        })
      }
      
    }else{
          const mensaje = "Debe seleccionar un mensaje";
          this.snackBar.open(mensaje, 'Aviso',{duration: 1000})
    }
  }

  //Metodo para eliminar examenes selccionados
  eliminarExamen(index: number){
    this.listaExamenes.splice(index,1);
  }

  aceptar(){
    //La especialidad no se tiene autocomplete
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;

    //Asignacion de objetos a la variable consulta
    let consulta = new Consulta();
    consulta.paciente = this.form.value['paciente'];
    consulta.medico = this.form.value['medico'];
    consulta.especialidad = especialidad;
    consulta.numConsultorio = "C1";
    consulta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;

   let consultaListaDTO = new ConsultaListaExamenDTO();
   consultaListaDTO.consulta = consulta;
   consultaListaDTO.lstExamen = this.listaExamenes;

   this.consultaService.registrarConsultaDTO(consultaListaDTO).subscribe(()=>{
     setTimeout(()=>{
      this.snackBar.open("Consulta realizada", 'Aviso', {duration:1500})
      this.limpiarCampos();
     },2000)
   })
  }

  limpiarCampos(){
    // this.idPacienteSeleccionado = null;
    // this.idMedicoSeleccionado = null;
    this.myControlPaciente.reset();
    this.myControlMedico.reset();
    this.idEspecialidadSeleccionado = null;
    this.idExamenSeleccionado = null;
    this.listaExamenes = [];
    this.detalleConsulta = [];
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);

  }

  get verificar(){
    return ( this.myControlPaciente.value!=null
          && this.myControlPaciente.value!=''
          && this.myControlPaciente.value!=undefined
          && this.myControlMedico.value!=null
          && this.myControlMedico.value!=''
          && this.myControlMedico.value!=undefined
          && this.idEspecialidadSeleccionado!=undefined
          && this.fechaSeleccionada!=null
          && this.listaExamenes.length>0
          && this.detalleConsulta.length>0  
          )

  }

}
