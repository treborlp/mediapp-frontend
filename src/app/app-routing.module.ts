import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';

const routes: Routes = [
  {path: "paciente", component: PacienteComponent, children: [
    {path: "nuevo", component: PacienteEdicionComponent},
    {path: "edicion/:id", component: PacienteEdicionComponent}
  ]}, 
  {path: "medico", component: MedicoComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
