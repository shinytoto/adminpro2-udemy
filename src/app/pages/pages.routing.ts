import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de tema' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' } },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Búsquedas' } },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de la aplicación' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos de la aplicación' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de médico' } },

      // Rutas de Admin
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios de la aplicación' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
