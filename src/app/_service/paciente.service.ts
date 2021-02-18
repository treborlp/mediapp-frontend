import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  pacienteCambio = new Subject<Paciente[]>(); //Le digo que en esta variable voy actualizar una lista de pacientes cambiados
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

}
