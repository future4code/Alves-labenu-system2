import { Estudante } from "../model/Estudante";
import BaseDataBase from "./baseDateBase";

export class EstudanteData extends BaseDataBase {

    async insertEstudante(estudante: Estudante): Promise<void> {

        await this.getConnection()
            .insert({
                id: estudante.getId(),
                name: estudante.getName(),
                email: estudante.getEmail(),
                date_nasc: estudante.getDate_nasc(),
                hobby_name: estudante.getHobby_name()
            })
            .into("LabenuSystem_Estudante")
    }

    // async selectEstudante(){
    // }
}