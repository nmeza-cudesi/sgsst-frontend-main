import { Usuario } from './usuario.model';

interface _departamento {
  nombre: string;
}


export class Riesgo{

  
  
  constructor(
    public _id: string,
    public estado:string,
    public usuario: Usuario,
    public departamento: _departamento,
    public descripcion: string,
    public fecha_creado: string,
    public uid?: string,
  ){}

}