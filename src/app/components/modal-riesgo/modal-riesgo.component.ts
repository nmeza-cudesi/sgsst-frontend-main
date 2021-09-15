import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Riesgo } from 'src/app/models/riesgo.model';

import { ModalRiesgoService } from 'src/app/services/modal-riesgo.service';
import { RiesgoService } from 'src/app/services/riesgo.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-riesgo',
  templateUrl: './modal-riesgo.component.html',
  styleUrls: ['./modal-riesgo.component.css']
})
export class ModalRiesgoComponent implements OnInit {

  public updateForm:FormGroup;
  public riesgos: Riesgo;
  

  constructor( 
                private fb: FormBuilder,
                public modalRiesgoService: ModalRiesgoService,
                private riesgoService: RiesgoService,
                ) { 


                }

  ngOnInit(): void {

    this.updateForm = this.fb.group({
      actualizacion:['', Validators.required],
      estado:['', Validators.required],

  }) 

    //this.cargarRiesgos();
    this.cargarRiesgo()
  }

  /*cargarRiesgos() {
    this.modalRiesgoService.riesgo()
      .subscribe( ({ riesgos }) => {
        this.riesgos= riesgos._id, ;
        console.log(riesgos)
    })

    
  }*/

  cargarRiesgo() {
    this.riesgos= this.modalRiesgoService.riesgo;
    console.log(this.riesgos)
    }

    
  


  cerrar(){
    this.modalRiesgoService.cerrar();
  }


  actualizarRiesgo(){
    console.log(this.updateForm.value);
    const {_id, actualizacion, estado} = this.updateForm.value;
      this.riesgoService.actualizarRiesgo(_id, actualizacion)
          .subscribe( resp => {
            Swal.fire('Estado', ` riesgo actualizado correctamente`, 'success');
          }
          ,
        
  
       (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });
    
    }
    cambiarEstado( riesgo:Riesgo ) {
    
      this.riesgoService.guardarEstado( riesgo )
        .subscribe( resp => {
          console.log(resp); 
        })
    }

  

}
