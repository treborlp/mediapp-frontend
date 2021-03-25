import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente> {
  
  private pacienteCambio = new Subject<Paciente[]>(); //Le digo que en esta variable voy actualizar una lista de pacientes cambiados
  private mensajeCambio = new Subject<string>(); // Hacemos reactivo a la variable mensaje Cambio

  constructor(protected http: HttpClient) {
    super(http, `${environment.HOST}/pacientes`)
   }


setPacienteCambio(pacientes: Paciente[]){
  this.pacienteCambio.next(pacientes);
}
getPacienteCambio(){
  return this.pacienteCambio.asObservable();
}

setMensajeCambio(mensaje: string){
  this.mensajeCambio.next(mensaje);
}

getMensajeCambio(){
  return this.mensajeCambio.asObservable();
}

listarPageable(page: number, size: number){
  return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`)
}

}
