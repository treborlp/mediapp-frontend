import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConsultaService } from '../../_service/consulta.service';
import * as moment from "moment";
import { ConsultaDto } from '../../_model/consulta-dto';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();

  constructor(private consultaService: ConsultaService) { }

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
      this.consultaService.buscarFecha(fecha).subscribe(data=>console.log(data));
    }else{
      this.consultaService.buscarOtros(filtroConsulta).subscribe(data=>console.log(data));
    }
  }

}
