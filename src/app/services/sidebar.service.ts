import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

   /*menu: any[] = [
     {
       titulo: 'Dashboard',
       icono: 'mdi mdi-gauge',
       submenu: [
         { titulo: 'Inicio', url: '/' },
         //{ titulo: 'Gráficas', url: 'grafica1' },
         //{ titulo: 'rxjs', url: 'rxjs' },
         //{ titulo: 'Promesas', url: 'promesas' },
         //{ titulo: 'ProgressBar', url: 'progress' },
       ]
     },

     {
       titulo: 'Mantenimientos',
       icono: 'mdi mdi-folder-lock-open',
       submenu: [
         { titulo: 'Usuarios', url: 'usuarios' },
         { titulo: 'Departamentos', url: 'departamentos' },
         { titulo: 'Usuarios', url: 'agentes' },
       ]
     },
   ];*/

}