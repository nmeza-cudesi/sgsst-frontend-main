import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Departamento } from '../../../models/departamento.model';
import { Agente } from '../../../models/agente.model';


import { UsuarioService } from '../../../services/usuario.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { AgenteService } from '../../../services/agente.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styles: [
  ]
})
export class AgenteComponent implements OnInit {

  public agenteForm: FormGroup;
  public departamentos: Departamento[] = [];
  public agenteSeleccionado: Agente;
  public departamentoSeleccionado: Departamento;



  constructor( private fb: FormBuilder,
               private departamentoService: DepartamentoService,
               private agenteService: AgenteService,
               private usuarioService: UsuarioService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarAgente( id ) );

    this.agenteForm = this.fb.group({
      nombre: ['', Validators.required ],
      departamento: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
    });

    this.cargarDepartamentos();

    this.agenteForm.get('departamento').valueChanges
        .subscribe( departamentoId => {
          this.departamentoSeleccionado = this.departamentos.find( h => h._id === departamentoId );
        })
  }

  cargarAgente(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }
    
     this.agenteService.obtenerAgentePorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( agente => {

        if ( !agente ) {
          return this.router.navigateByUrl(`/dashboard/agentes`);
        }

        const { nombre, departamento:{ _id } } = agente; 
        this.agenteSeleccionado = agente;
        this.agenteForm.setValue({ nombre, departamento: _id });
      });

  }

  cargarDepartamentos() {

    this.departamentoService.cargarDepartamentos()
      .subscribe( (departamentos: Departamento[]) => {
        this.departamentos = departamentos;
      })

    
  }

  guardarAgente() {

    const { nombre} = this.agenteForm.value;

    if ( this.agenteSeleccionado ) {
      // actualizar
      const data = {
        ...this.agenteForm.value,
        _id: this.agenteSeleccionado._id
      }
      // Realizar el posteo
    this.usuarioService.crearUsuario( this.agenteForm.value )
    .subscribe( resp => {
      this.agenteService.actualizarAgente( data )
        .subscribe( resp => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
        })
      

    }, (err) => {
      // Si sucede un error
      Swal.fire('Error', err.error.msg, 'error' );
    });
      /*this.agenteService.actualizarAgente( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })*/

    } else {
      // crear
      
      this.usuarioService.crearUsuario( this.agenteForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/agente/${ resp.agente._id }`)
        })
    }



  }

  

}
