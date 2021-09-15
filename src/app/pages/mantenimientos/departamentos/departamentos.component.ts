import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Departamento } from '../../../models/departamento.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: [
  ]
})
export class DepartamentosComponent implements OnInit, OnDestroy {

  public departamentos: Departamento[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor( private departamentoService: DepartamentoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarDepartamentos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarDepartamentos() );
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarDepartamentos();
    }

    this.busquedasService.buscar( 'departamentos', termino )
        .subscribe( resp => {

          this.departamentos = resp;

        });
  }

  cargarDepartamentos() {

    this.cargando = true;
    this.departamentoService.cargarDepartamentos()
        .subscribe( departamentos => {
          this.cargando = false;
          this.departamentos = departamentos;
        })

  }

  guardarCambios( departamento: Departamento ) {

    this.departamentoService.actualizarDepartamento( departamento._id, departamento.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', departamento.nombre, 'success' );
        });

  }

  eliminarDepartamento( departamento: Departamento ) {

    this.departamentoService.borrarDepartamento( departamento._id )
        .subscribe( resp => {
          this.cargarDepartamentos();
          Swal.fire( 'Borrado', departamento.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear departamento',
      text: 'Ingrese el nombre del nuevo Departamento',
      input: 'text',
      inputPlaceholder: 'Nombre del departamento',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.departamentoService.crearDepartamento( value )
        .subscribe( (resp: any) => {
          this.departamentos.push( resp.departamento )
        })
    }
  }

  abrirModal(departamento: Departamento) {

    this.modalImagenService.abrirModal( 'departamentos', departamento._id, departamento.img );

  }

}
 