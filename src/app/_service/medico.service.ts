import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../_model/medico';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicoCambio = new Subject<Medico[]>(); //Le digo que en esta variable voy actualizar una lista de medicos cambiados
  mensajeCambio = new Subject<string>(); // Hacemos reactivo a la variable mensaje Cambio

  private url: string = environment.HOST
  constructor(private http: HttpClient) { }

listar(){
  return this.http.get<Medico[]>(`${this.url}/medicos`)
}

listarPorId(id: number){
  return this.http.get<Medico>(`${this.url}/medicos/${id}`)
}

guardarMedico(medico: Medico){
  return this.http.post(`${this.url}/medicos`,medico)
}

modificarMedico(medico: Medico){
  return this.http.put(`${this.url}/medicos`,medico)
}

eliminar(id:number){
  return this.http.delete(`${this.url}/medicos/${id}`);
}
}
