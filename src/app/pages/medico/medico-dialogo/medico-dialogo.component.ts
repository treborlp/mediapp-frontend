import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from '../../../_service/medico.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {

  medico: Medico;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private dialogRef: MatDialogRef<MedicoDialogoComponent>,
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.medico = {...this.data}; //Con desestructuracion de objetos
    // this.medico = new Medico();
    // this.medico.idMedico = this.data.idMedico;
    // this.medico.nombres = this.data.nombres;
    // this.medico.apellidos = this.data.apellidos;
    // this.medico.cmp = this.data.cmp;
    // this.medico.fotoUrl = this.medico.fotoUrl; 
    
  }

  actualizarMedico(){
    if(this.medico!=null && this.medico.idMedico > 0){
     //Actualizar 
     this.medicoService.modificarMedico(this.medico).pipe(switchMap( ()=>{
       return this.medicoService.listar(); //Retornara la lista de medicos actualizada
     })).subscribe((medicosActualizados) =>{
       this.medicoService.medicoCambio.next(medicosActualizados);
       this.medicoService.mensajeCambio.next('Medico modificado');
     })
    }else{
     //Registrar
     this.medicoService.guardarMedico(this.medico).pipe(switchMap( ()=>{
      return this.medicoService.listar(); //Retornara la lista de medicos actualizada
    })).subscribe((medicosActualizados) =>{
      this.medicoService.medicoCambio.next(medicosActualizados);
      this.medicoService.mensajeCambio.next('Medico registrado');
    })
    }

    this.cerrarDialogo();
  }

  cerrarDialogo(){
    this.dialogRef.close();
  }

}
