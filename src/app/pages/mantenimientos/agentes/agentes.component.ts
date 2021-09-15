import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Agente } from '../../../models/agente.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { AgenteService } from '../../../services/agente.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styles: [
  ]
})
export class AgentesComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public agentes: Agente[] = [];
  private imgSubs: Subscription;

  constructor( private agenteService: AgenteService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarAgentes();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarAgentes() );
  }

  cargarAgentes() {
    this.cargando = true;
    this.agenteService.cargarAgente()
      .subscribe( agentes => {
        this.cargando = false;
        this.agentes = agentes;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarAgentes();
    }

    this.busquedasService.buscar( 'agentes', termino )
        .subscribe( resp => {
          this.agentes = resp;
        });
  }

  abrirModal(agente: Agente) {

    this.modalImagenService.abrirModal( 'agentes', agente._id, agente.img );

  }

  borrarAgente( agente: Agente ) {

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ agente.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.agenteService.borrarAgente( agente._id )
          .subscribe( resp => {
            
            this.cargarAgentes();
            Swal.fire(
              'usuario borrado',
              `${ agente.nombre } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

}
