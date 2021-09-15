
import { Usuario } from '../models/usuario.model';
import { Departamento } from '../models/departamento.model';

export interface RiesgoForm {
    nombre: Usuario[];
    departamento: Departamento[];
    descripcion: string;
    img: string;
}
