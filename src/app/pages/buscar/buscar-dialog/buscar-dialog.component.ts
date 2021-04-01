import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Consulta } from '../../../_model/consulta';
import { ConsultaListaExamenDTO } from '../../../_dto/consulta-lista-examen-dto';
import { ConsultaService } from '../../../_service/consulta.service';

@Component({
  selector: 'app-buscar-dialog',
  templateUrl: './buscar-dialog.component.html',
  styleUrls: ['./buscar-dialog.component.css']
})
export class BuscarDialogComponent implements OnInit {

  consulta: Consulta;
  examenes: ConsultaListaExamenDTO[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Consulta,
    private dialogRef: MatDialogRef<BuscarDialogComponent>,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    this.consulta = this.data; //La data viene del 
    this.listarExamenes();
  }

  cerrarDialogo(){
    this.dialogRef.close();
  }

  listarExamenes(){
    this.consultaService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe(examenes=>this.examenes = examenes)
  }

}
