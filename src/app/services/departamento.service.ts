import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Departamento } from '../models/departamento.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  public departamento: Departamento;


  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.departamento.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarDepartamentos() {

    const url = `${ base_url }/departamentos`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, departamentos: Departamento[] }) => resp.departamentos )
              );
  }

  crearDepartamento( nombre: string ) {

    const url = `${ base_url }/departamentos`;
    return this.http.post( url, { nombre }, this.headers );
  }
  
  actualizarDepartamento( _id: string, nombre: string  ) {

    const url = `${ base_url }/departamentos/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarDepartamento( _id: string ) {

    const url = `${ base_url }/departamentos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
