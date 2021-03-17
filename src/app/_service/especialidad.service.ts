import { Injectable } from '@angular/core';
import { Especialidad } from '../_model/especialidad';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService extends GenericService<Especialidad> {

  private especialidadCambio = new Subject<Especialidad[]>(); //Le digo que en esta variable voy actualizar una lista de pacientes cambiados
  private mensajeCambio = new Subject<string>(); // Hacemos reactivo a la variable mensaje Cambio
  constructor(protected http: HttpClient) {
    super(http, `${environment.HOST}/especialidades`)
   }

  setEspecialidadCambio(especialidades: Especialidad[]){
    this.especialidadCambio.next(especialidades);
  }
  getEspecialidadCambio(){
    return this.especialidadCambio.asObservable();
  }
  
  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }
  
  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

}
