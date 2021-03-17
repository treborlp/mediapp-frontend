import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExamenService } from '../../../_service/examen.service';
import { Examen } from '../../../_model/examen';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  form : FormGroup;
  id: number; //El id se obtiene de los parametros del Link
  edicion : boolean;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private examenService : ExamenService
  ) { }

  ngOnInit(): void {

     //La etiqueta formControlName referencia los valores del FormGroup
     this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });

    //Obtenemos los datos de los parametros en la URL
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"]!=null; //Si el id no existe this.edicion sera false
      this.initForm(this.id);
    })
  }

  operar(){
    let examen = new Examen();
    examen.idExamen = this.form.value['id'];
    examen.nombre = this.form.value['nombre'];
    examen.descripcion = this.form.value['descripcion'];

    if(this.edicion){
      //Practiva comun
      this.examenService.modificar(examen).subscribe(() => {
        this.examenService.listar().subscribe(data =>{
          this.examenService.setExamenCambio(data); //Le pasamos la nueva data al pacienteCambio
          this.examenService.setMensajeCambio('Examen Modificado');
        })
      })
    }else{
      //Registrar de forma ideal
      this.examenService.registrar (examen).pipe(switchMap(()=>{ //switchmap permite operar dos o mas observable en uno
        return this.examenService.listar();
      })).subscribe(data =>{
        this.examenService.setExamenCambio(data); 
        this.examenService.setMensajeCambio('Examen Registrado');
      })
    }

    this.router.navigate(['examen']);
  }

  //Inicializamos el form con los datos de la BD
  initForm(id: number){
    if(this.edicion){
      this.examenService.listarPorId(id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idExamen),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

}
