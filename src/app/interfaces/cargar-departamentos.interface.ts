import { Departamento } from '../models/departamento.model';

export interface CargarUsuario {
    total: number;
    departamentos: Departamento[];
}