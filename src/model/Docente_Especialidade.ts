export class Docente_Especialidade {
    constructor(
        private id: string,
        private docente_id: string,
        private especialidade_id: string
        )
        {}

        getId() {
            return this.id
        }
        getDocente_id() {
            return this.docente_id
        }
        getEspecialidade() {
            return this.especialidade_id
        }
}