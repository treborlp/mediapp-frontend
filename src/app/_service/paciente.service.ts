import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private pacienteCambio = new Subject<Paciente[]>(); //Le digo que en esta variable voy actualizar una lista de pacientes cambiados
  private mensajeCambio = new Subject<string>(); // Hacemos reactivo a la variable mensaje Cambio
  private url: string = environment.HOST
  constructor(private http: HttpClient) { }

listar(){
  return this.http.get<Paciente[]>(`${this.url}/pacientes`)
}

listarPorId(id: number){
  return this.http.get<Paciente>(`${this.url}/pacientes/${id}`)
}

guardarPaciente(paciente: Paciente){
  return this.http.post(`${this.url}/pacientes`,paciente)
}

modificarPaciente(paciente: Paciente){
  return this.http.put(`${this.url}/pacientes`,paciente)
}

eliminar(id:number){
  return this.http.delete(`${this.url}/pacientes/${id}`);
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

}
