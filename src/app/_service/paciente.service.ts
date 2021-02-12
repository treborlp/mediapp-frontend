import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private url: string = environment.HOST
  constructor(private http: HttpClient) { }

listar(){
  return this.http.get<Paciente[]>(`${this.url}/pacientes`)
}

listarPorId(id: number){
  return this.http.get<Paciente>(`${this.url}/pacientes/${id}`)
}

}
