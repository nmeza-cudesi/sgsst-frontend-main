import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DepartamentosComponent } from './mantenimientos/departamentos/departamentos.component';
import { AgentesComponent } from './mantenimientos/agentes/agentes.component';
import { AgenteComponent } from './mantenimientos/agentes/agente.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Riesgos' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Que es SGSST' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Formato de autoreporte de condiciones de trabajo' }},

            // Mantenimientos
            { path: 'departamentos', component: DepartamentosComponent, data: { titulo: 'Departamentos' }},
            { path: 'agentes', component: AgentesComponent, data: { titulo: 'Creación de agentes' }},
            { path: 'agente/:id', component: AgenteComponent, data: { titulo: 'Creación de agentes' }},

            // Rutas de Admin
            { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


