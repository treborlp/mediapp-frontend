import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Consulta } from '../../../_model/consulta';

@Component({
  selector: 'app-buscar-dialog',
  templateUrl: './buscar-dialog.component.html',
  styleUrls: ['./buscar-dialog.component.css']
})
export class BuscarDialogComponent implements OnInit {

  consulta: Consulta;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Consulta,
    private dialogRef: MatDialogRef<BuscarDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.consulta = this.data;
  }

  cerrarDialogo(){
    this.dialogRef.close();
  }

}
