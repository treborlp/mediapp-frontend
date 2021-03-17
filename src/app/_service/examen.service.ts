import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Examen } from '../_model/examen';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen> {

  //Parametros reactivos
  private examenCambio = new Subject<Examen[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(http, `${environment.HOST}/examenes`)
   }

   /* Get and Set*/

   setExamenCambio(examenes: Examen[]){
     this.examenCambio.next(examenes);
   }

   getExamenCambio(){
     return this.examenCambio.asObservable();
   }

   setMensajeCambio(mensaje: string){
     this.mensajeCambio.next(mensaje);
   }

   getMensajeCambio(){
     return this.mensajeCambio.asObservable();
   }


}
