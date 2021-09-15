import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import {RxjsComponent} from'./rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import {DepartamentosComponent } from './mantenimientos/departamentos/departamentos.component';
import { AgentesComponent } from './mantenimientos/agentes/agentes.component';
import { AgenteComponent } from './mantenimientos/agentes/agente.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RiesgoComponent } from './riesgo/riesgo.component';
import { TablaComponent } from './tabla/tabla.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    DepartamentosComponent,
    AgentesComponent,
    AgenteComponent,
    BusquedaComponent,
    RiesgoComponent,
    TablaComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    ReactiveFormsModule,
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
