import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Agente } from '../models/agente.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarAgente() {

    const url = `${base_url}/agentes`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, agentes: Agente[] }) => resp.agentes)
      );
  }

  obtenerAgentePorId(id: string) {

    const url = `${base_url}/agentes/${id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, agente: Agente }) => resp.agente)
      );
  }

  crearAgente(agente: { nombre: string, departamento: string, email: string, password: string }) {

    const url = `${base_url}/agentes`;
    return this.http.post(url, agente, this.headers);
  }

  actualizarAgente(agente: Agente) {

    const url = `${base_url}/agentes/${agente._id}`;
    return this.http.put(url, agente, this.headers);
  }

  borrarAgente(_id: string) {

    const url = `${base_url}/agentes/${_id}`;
    return this.http.delete(url, this.headers);
  }

  

}
