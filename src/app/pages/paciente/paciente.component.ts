import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from '../../_service/paciente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos','direcion',  'acciones'];
  dataSource : MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator : MatPaginator; //Referenciamos el paginador
  @ViewChild(MatSort) sort : MatSort;

  //Cantidad de datos de la tabla paciente
  cantidad: number;

  constructor(private snackBar: MatSnackBar, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.pacienteService.getPacienteCambio().subscribe(data=>{
      //this.crearTabla(pacientes);
      this.crearTablaPaginada(data)
    })

    this.pacienteService.getMensajeCambio().subscribe((mensaje)=>{
      this.snackBar.open(mensaje, "Aviso", {duration:2000})
    })


    // this.pacienteService.listar().subscribe(pacientes => {
    //   this.crearTabla(pacientes);
    // })

    this.pacienteService.listarPageable(0,10).subscribe(data=>{
      this.crearTablaPaginada(data);
    })
  }

  eliminarPaciente(id:number){
    this.pacienteService.eliminar(id).pipe(switchMap(()=>{
      return this.pacienteService.listarPageable(0,10);
    })).subscribe((data)=>{
      this.pacienteService.setPacienteCambio(data);
      this.pacienteService.setMensajeCambio("Paciente Eliminado")
    })
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }

  //Este metodo solo se usa cuando no se pagina la data
  crearTabla(data: Paciente[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator //Asignamos el paginador a la tabla
    this.dataSource.sort = this.sort; // Asignamos el clasificador o sort
  }

  //Metodo de listar pacientes con peageble
  crearTablaPaginada(data: any){
    this.cantidad = data.totalElements;
    this.dataSource = new MatTableDataSource(data.content);
    this.dataSource.sort = this.sort 
  }

  mostrarMas(e: any){
    this.pacienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data=>{
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    })
  }



}
