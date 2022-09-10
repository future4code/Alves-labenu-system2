import { Docente } from "../model/Docente";
import BaseDataBase from "./baseDateBase";

export class DocenteData extends BaseDataBase {
    async insertDocente(docente: Docente): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: docente.getId(),
                    name: docente.getName(),
                    email: docente.getEmail(),
                    date_nasc: docente.getDate_nasc(),
                    turma_id: docente.getTurma_id(),
                    // especialidade_id: docente.getEspecialidadeId()
                })
                .into("LabenuSystem_Docente")
        } catch (error) {
            console.log(error)
        }
    }
    // async selectDocenteName(name: string){

    // }
}