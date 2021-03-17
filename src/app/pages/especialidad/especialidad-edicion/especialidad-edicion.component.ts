import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Especialidad } from '../../../_model/especialidad';
import { switchMap } from 'rxjs/operators';
import { EspecialidadService } from '../../../_service/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  form : FormGroup;
  id: number; //El id se obtiene de los parametros del Link
  edicion : boolean;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private especialidadService: EspecialidadService
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
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.form.value['id'];
    especialidad.nombre = this.form.value['nombre'];
    especialidad.descripcion = this.form.value['descripcion'];

    if(this.edicion){
      //Practiva comun
      this.especialidadService.modificar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data =>{
          this.especialidadService.setEspecialidadCambio(data); //Le pasamos la nueva data al pacienteCambio
          this.especialidadService.setMensajeCambio('Especialidad Modificado');
        })
      })
    }else{
      //Registrar de forma ideal
      this.especialidadService.registrar (especialidad).pipe(switchMap(()=>{ //switchmap permite operar dos o mas observable en uno
        return this.especialidadService.listar();
      })).subscribe(data =>{
        this.especialidadService.setEspecialidadCambio(data); 
        this.especialidadService.setMensajeCambio('Especialidad Registrado');
      })
    }

    this.router.navigate(['especialidad']);
  }


  //Inicializamos el form con los datos de la BD
  initForm(id: number){
    if(this.edicion){
      this.especialidadService.listarPorId(id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idEspecialidad),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

}
