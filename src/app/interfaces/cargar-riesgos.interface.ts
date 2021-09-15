import { Riesgo } from '../models/riesgo.model';

export interface CargarRiesgo {
    total: number;
    riesgos: Riesgo[];
}