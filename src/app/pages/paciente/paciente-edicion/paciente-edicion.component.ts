import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PacienteService } from '../../../_service/paciente.service';
import { Paciente } from '../../../_model/paciente';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  form : FormGroup;
  id: number;
  edicion : boolean;
  
  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private pacienteService : PacienteService
  ) { }

  ngOnInit(): void {

    //La etiqueta formControlName referencia los valores del FormGroup
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'direccion': new FormControl(''),
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"]!=null;
      this.initForm(this.id);
    })

  }

  operar(){
    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.telefono = this.form.value['telefono'];
    paciente.direcion = this.form.value['direccion'];

    if(this.edicion){
      //Practiva comun
      this.pacienteService.modificar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data =>{
          this.pacienteService.setPacienteCambio(data); //Le pasamos la nueva data al pacienteCambio
          this.pacienteService.setMensajeCambio('Paciente Modificado');
        })
      })
    }else{
      //Registrar de forma ideal
      this.pacienteService.registrar(paciente).pipe(switchMap(()=>{ //switchmap permite operar dos o mas observable en uno
        return this.pacienteService.listar();
      })).subscribe(data =>{
        this.pacienteService.setPacienteCambio(data); 
        this.pacienteService.setMensajeCambio('Paciente agregado');
      })
    }

    this.router.navigate(['paciente']);
  }

  initForm(id: number){
    if(this.edicion){
      this.pacienteService.listarPorId(id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'direccion': new FormControl(data.direcion),
        });
      }
      )

    }
  }

}
