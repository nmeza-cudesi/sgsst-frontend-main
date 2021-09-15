import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

import { Riesgo } from 'src/app/models/riesgo.model';


import { RiesgoService } from '../../services/riesgo.service';
import { ModalRiesgoService } from '../../services/modal-riesgo.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {


  public totalRiesgos: number = 0;
  public riesgos: Riesgo[] = [];
  public desde: number = 0;
  public cargando: boolean = true;




  constructor(private riesgoService: RiesgoService,
    private modalRiesgoService: ModalRiesgoService
  ) { }

  ngOnInit(): void {

    this.cargarRiesgos();

  }


  cargarRiesgos() {
    this.riesgoService.cargarRiesgos(this.desde)
      .subscribe(({ total, riesgos }) => {
        this.totalRiesgos = total;
        this.riesgos = riesgos;
        this.cargando = false;
      })


  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalRiesgos) {
      this.desde -= valor;
    }

    this.cargarRiesgos();
  }


  async abrir(riesgo: Riesgo) {

    this.modalRiesgoService.abrirModal('riesgos', riesgo);

    //this.modalRiesgoService.abrirModal('riesgos', riesgo._id, riesgo.usuario.nombre, riesgo.departamento.nombre, riesgo.descripcion, riesgo.estado)
  }

  /*estado: String ='';
  async actualizar(riesgo: Riesgo) {
    const { value = '' } = await Swal.fire<string>({
      title: 'Actualizar Riesgo',
      html:'<p><strong>Usuario: </strong>${ riesgo.usuario.nombre }</p>' +
      '<p><strong>Departamento: </strong>${ riesgo.departamento.nombre }</p>'+
      '<p><strong>Estado actual: </strong>${ riesgo.estado }</p>' +
      '<p><strong>Descripcion: </strong>${ riesgo.descripcion }</p>'+
      '<p><strong>Actualizar estado: </strong></p>
            <select class="form-control"
                [(ngModel)]="estado"
                (change)="cambiarEstado( estado )>
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
                <option value="En proceso">En proceso</option>
            </select>',
      text: 'Actualizacion del caso',
      input: 'textarea',
      inputPlaceholder: 'Describa el caso',
      showCancelButton: true,
    });

    console.log(value)
    
    
    
  }

  cambiarEstado(estado){
    console.log(estado)
  }*/


  /*async actualizar(riesgo: Riesgo) {
    const { value: formValues } = await Swal.fire({
      title: 'Actualizar Estado',
      html: 
        '<p><strong>Usuario: </strong>${riesgo.usuario.nombre}</p>' +
        '<p><strong>Departamento: </strong>${riesgo.departamento.nombre}</p>' +
        '<p><strong>Estado actual: </strong>${riesgo.estado}</p>' +
        '<p><strong>Descripcion: </strong>${riesgo.descripcion}</p>' +
        '<p><strong>Actualizar descripcion:
            <textarea class="form-control" rows="5" cols="50" >
            </textarea>
          </strong></p>',

      input: 'select',
      inputOptions: {
        'Actualizar Estado': {
          abierto: 'Abierto',
          cerrado: 'Cerrado',
          proceso: 'En proceso'
        },
      },
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      },
      inputPlaceholder: 'Seleccione',
      showCancelButton: true,

    })

    if (value) {
      Swal.fire('Has : ${value} el caso')
    }
  }*/


  async actualizar(riesgo: Riesgo) {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
        `<p><strong>Usuario: </strong>${riesgo.usuario.nombre}</p>` +
        `<p><strong>Departamento: </strong>${riesgo.departamento.nombre}</p>` +
        `<p><strong>Estado actual: </strong>${riesgo.estado}</p>` +
        `<p><strong>Descripcion: </strong>${riesgo.descripcion}</p>` +
        `<p><strong>Actualizar descripcion:` +
        `<textarea class="form-control" rows="3" cols="50" id="descripcion">`+
        `</textarea>`+
        `  </strong></p>`+
        `<select class="form-control" id="estado">`+
        `    <option value="Abierto">Abierto</option>`+
        `    <option value="Cerrado">Cerrado</option>`+
        `    <option value="En proceso">En proceso</option>`+
        `</select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          (document.getElementById('descripcion') as HTMLInputElement).value,
          (document.getElementById('estado') as HTMLInputElement).value,
        ]
      }
    })

    if (formValues) {
      //console.log(JSON.stringify(formValues));
      console.log(formValues[0]);
      console.log(formValues[1]);

      const data = {
        descripcion:formValues[0],
        estado: formValues[1]
      }
      this.riesgoService.actualizarRiesgo( riesgo._id, data )
        .subscribe( (resp: any) => {
          //this.riesgos.push( resp.riesgos )
          this.cargarRiesgos();
          console.log(resp)

          if(resp){
            Swal.fire('riesgo actualizado')
            this.cargarRiesgos();
          }
        })
    }



  }




}
