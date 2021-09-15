import { Departamento } from './departamento.model';

interface _AgenteUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Agente {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _AgenteUser,
        public departamento?: Departamento,
    ) {}

}

