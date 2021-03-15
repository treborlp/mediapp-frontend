import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medico } from 'src/app/_model/medico';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {

  medico: Medico;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medico,
  ) { }

  ngOnInit(): void {
    this.medico = this.data;
  }

}
