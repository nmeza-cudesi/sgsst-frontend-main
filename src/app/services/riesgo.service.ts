import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RiesgoForm } from '../interfaces/riesgo-form.interface';
import { environment } from '../../environments/environment';
import { Departamento } from '../models/departamento.model';
import {CargarRiesgo} from '../interfaces/cargar-riesgos.interface';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Riesgo } from '../models/riesgo.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {

  public departamento: Departamento;
  public usuario: Usuario;

  constructor(
    private http: HttpClient
  ) { }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | 'ANALITIC_USER' {
    return this.usuario.role;
  }


  get token(): string {
    return localStorage.getItem('token') || '';
  }
  

  get uid():string {
    return this.departamento.uid || '';
  }

  get id():string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }

  
  crearRiesgo( formData: RiesgoForm ) {
    
    return this.http.post(`${ base_url }/riesgos`, formData )
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token,  resp.menu );
      })
    )

  }

  cargarRiesgos( desde: number = 0 ) {

    const url = `${ base_url }/riesgos?desde=${desde}`;
    return this.http.get<CargarRiesgo>( url, this.headers )
            .pipe(
              map( resp => {
                const riesgos = resp.riesgos.map( 
                  riesgos => new Riesgo( riesgos._id,   riesgos.estado,  riesgos.usuario,    riesgos.departamento,   riesgos.descripcion,   riesgos.fecha_creado,   riesgos.uid,)
                );
                return {
                  total: resp.total,
                  riesgos
                };
              })
            )
  }

  actualizarRiesgo( _id: string, data:any ){
    const url = `${ base_url }/riesgos/${ _id }`;
    return this.http.put( url,  data , this.headers );
  }

  guardarEstado( riesgo: Riesgo ) {

    return this.http.put(`${ base_url }/riesgos/${ riesgo.uid }`, riesgo, this.headers );

  }





}
