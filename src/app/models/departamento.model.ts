interface _DepartamentoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Departamento {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _DepartamentoUser,
        public uid?: string,
    ) {}

}

