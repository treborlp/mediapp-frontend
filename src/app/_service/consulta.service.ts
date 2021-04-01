import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamenDTO } from '../_dto/consulta-lista-examen-dto';
import { ConsultaDto } from '../_model/consulta-dto';
import { Consulta } from '../_model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: string = `${environment.HOST}/consultas`;

  constructor(private http: HttpClient) { }

  registrarConsultaDTO(consultaDTO: ConsultaListaExamenDTO){
    return this.http.post(this.url, consultaDTO);
  }

  buscarOtros(filtroConsulta: ConsultaDto){
    return this.http.post<Consulta[]>(`${this.url}/buscar/otros`, filtroConsulta)
  }

  buscarFecha(fecha: string){
    return this.http.get<Consulta[]>(`${this.url}/buscar?fecha=${fecha}`)
  }

  listarExamenPorConsulta(idConsulta: number){
    return this.http.get<ConsultaListaExamenDTO[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`)
  }


}
