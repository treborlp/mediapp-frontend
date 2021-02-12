import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PacienteService } from '../../../_service/paciente.service';

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

  operar(){}

  initForm(id: number){
    if(this.edicion){
      this.pacienteService.listarPorId(id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'direccion': new FormControl(data.direccion),
        });
      }
      )

    }
  }

}
