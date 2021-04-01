import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConsultaService } from '../../_service/consulta.service';
import * as moment from "moment";
import { ConsultaDto } from '../../_model/consulta-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Consulta } from '../../_model/consulta';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BuscarDialogComponent } from './buscar-dialog/buscar-dialog.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();


  //Configuracion de la tabla
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['paciente', 'medico', 'especialidad','fecha',  'acciones'];
  dataSource : MatTableDataSource<Consulta>;


  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    })
    
  }

  buscar(){
    let fecha = this.form.value['fechaConsulta'];
    fecha = fecha!=null ? moment(fecha).format("YYYY-MM-DDTHH:mm:ss"): '';

    let filtroConsulta = new ConsultaDto(this.form.value['dni'], this.form.value['nombreCompleto']);
    if(filtroConsulta.dni.length==0){
      //  const {dni, ...filtro} = filtroConsulta;
      //  console.log(filtro);
       delete filtroConsulta.dni;    
    }
    if(filtroConsulta.nombreCompleto.length==0){
      // const {nombreCompleto, ...filtro} = filtroConsulta;  
      // console.log(filtro);  
      delete filtroConsulta.nombreCompleto;
    }

    if(fecha!=null && fecha!==""){
      this.consultaService.buscarFecha(fecha).subscribe(data=>this.crearTabla(data));
    }else{
      this.consultaService.buscarOtros(filtroConsulta).subscribe(data=> this.crearTabla(data));
    }
  }

  crearTabla(data: Consulta[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  verDetalle(consulta: Consulta){
    this.dialog.open(BuscarDialogComponent, {
      data:consulta,
      width: "auto",
      height: "auto"
    })
  }

}
