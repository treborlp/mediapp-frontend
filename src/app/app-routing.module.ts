import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaEspecialComponent } from './pages/consulta-especial/consulta-especial.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  {path: "paciente", component: PacienteComponent, children: [
    {path: "nuevo", component: PacienteEdicionComponent},
    {path: "edicion/:id", component: PacienteEdicionComponent}
  ]},
  {path: "examen", component: ExamenComponent, children: [
    {path: "nuevo", component: ExamenEdicionComponent},
    {path: "edicion/:id", component: ExamenEdicionComponent}
  ]},
  {path: "especialidad", component: EspecialidadComponent, children: [
    {path: "nuevo", component: EspecialidadEdicionComponent},
    {path: "edicion/:id", component: EspecialidadEdicionComponent}
  ]},  
  {path: "medico", component: MedicoComponent},
  {path: "consulta", component: ConsultaComponent},
  {path: "consulta-wizard", component: WizardComponent},
  {path: "consulta-especial", component: ConsultaEspecialComponent},
  {path: "buscar", component: BuscarComponent},
  {path: "reporte", component: ReporteComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
