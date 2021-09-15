import { Component } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { UsuarioService } from '../../services/usuario.service';
import { RiesgoService } from 'src/app/services/riesgo.service';
import { Departamento } from '../../models/departamento.model';

import { Usuario } from '../../models/usuario.model';
import { Riesgo } from 'src/app/models/riesgo.model';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public totalUsuarios: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public riesgos: Riesgo[]=[];
  public totalRiesgos : number =0;
  
  public departamentos: Departamento[] = [];

  public labels1: string[] = [];
  public data1 = [
    this.departamentos.length
  ];

  constructor(
    private departamentoService: DepartamentoService,
    private usuarioService: UsuarioService,
    private riesgoService: RiesgoService,
  ){}

  ngOnInit():void{
    this.cargarUsuarios();

    this.cargarDepartamentos();

    this.cargarRiesgos();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
    })
  }

  cargarDepartamentos() {

    this.cargando = true;
    this.departamentoService.cargarDepartamentos()
        .subscribe( departamentos => {
          this.cargando = false;
          this.departamentos = departamentos;
        })

  }
  cargarRiesgos() {
    this.riesgoService.cargarRiesgos( this.desde)
      .subscribe( ({ total, riesgos }) => {
        this.totalRiesgos = total;
        this.riesgos= riesgos;
        this.cargando = false;
    })

    
  }

}
