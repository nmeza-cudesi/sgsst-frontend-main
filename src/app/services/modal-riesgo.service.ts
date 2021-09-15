import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Riesgo } from '../models/riesgo.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ModalRiesgoService {

  private _ocultar: boolean= true;
  public tipo: 'usuarios'|'agentes'|'departamentos' | 'riesgos';
  public riesgo: Riesgo;



  get ocultar(){
    return this._ocultar;
  }

  abrirModal( 
    tipo: 'usuarios'|'agentes'|'departamentos' | 'riesgos',
    riesgo: Riesgo
  ) {
    this.tipo = tipo;
    this._ocultar = false;
    this.riesgo = riesgo;
}

  cerrar(){
    this._ocultar = true;
  }

  constructor() { }
}