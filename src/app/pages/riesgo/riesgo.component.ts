import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { UsuarioService } from 'src/app/services/usuario.service';


import { Departamento } from '../../models/departamento.model';
import { Usuario } from '../../models/usuario.model';

import {RiesgoService} from '../../services/riesgo.service'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-riesgo',
  templateUrl: './riesgo.component.html',
  styleUrls: ['./riesgo.component.css']
})
export class RiesgoComponent implements OnInit {
  
  public riesgoForm:FormGroup;
  public departamentos: Departamento[] = [];

  public usuario: Usuario;
  public departamento: Departamento;
  
  
  constructor(
          private fb: FormBuilder,
          private riesgoService: RiesgoService,
          private usuarioService: UsuarioService,
          private departamentoService: DepartamentoService,
  ) {   
          this.usuario = usuarioService.usuario;
          this.departamento =departamentoService.departamento;
  }

  ngOnInit(): void {



    this.riesgoForm = this.fb.group({
        usuario:['', Validators.required],
        departamento:['', Validators.required],
        descripcion:['', Validators.required]

    }) 

    this.cargarDepartamentos();

  }

  cargarDepartamentos() {

    this.departamentoService.cargarDepartamentos()
      .subscribe( (departamentos: Departamento[]) => {
        this.departamentos = departamentos;
      })

  }

  
  crearRiesgo(){
    console.log(this.riesgoForm.value);
    const {nombre} = this.riesgoForm.value;
      this.riesgoService.crearRiesgo(this.riesgoForm.value)
          .subscribe( resp => {
            Swal.fire('Creado', `${ nombre } riesgo creado correctamente`, 'success');
          }
          ,
        
  
       (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });
    }

  

}
