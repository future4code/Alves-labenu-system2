import { Usuario } from "./Usuario";

export class Estudante extends Usuario {
    constructor(
        id: string,
        name: string,
        email: string,
        date_nasc: Date,
        turma_id: string,
        private hobby_name: string
    ) {
        super(id, name, email, date_nasc, turma_id)
    }
    getHobby_name() {
        return this.hobby_name
    }
}