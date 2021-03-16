import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../_model/medico';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico>{

  private medicoCambio = new Subject<Medico[]>(); //Le digo que en esta variable voy actualizar una lista de medicos cambiados
  private mensajeCambio = new Subject<string>(); // Hacemos reactivo a la variable mensaje Cambio

  constructor(protected http: HttpClient) { 
    super(http, `${environment.HOST}/medicos`)
  }


setMedicoCambio(medicos: Medico[]){
  this.medicoCambio.next(medicos);
}
getMedicoCambio(){
  return this.medicoCambio.asObservable();
}

setMensajeCambio(mensaje: string){
  this.mensajeCambio.next(mensaje);
}

getMensajeCambio(){
  return this.mensajeCambio.asObservable();
}


}
