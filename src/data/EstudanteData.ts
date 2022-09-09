import { Estudante } from "../model/Estudante";
import BaseDataBase from "./baseDateBase";

export class EstudanteData extends BaseDataBase {

    async insertEstudante(estudante: Estudante): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: estudante.getId(),
                    name: estudante.getName(),
                    email: estudante.getEmail(),
                    date_nasc: estudante.getDate_nasc(),

                })
                .into("LabenuSystem_Estudante")
        } catch (error) {
            console.log("insertEstudante", error)
        }

    }



    async insertHobby(newIdHobby: string, hobby_name:string ):Promise<void> {
        console.log('entrei insertHobby')
        try {
            await this.getConnection()
                .insert({
                    id: newIdHobby,
                    name: hobby_name
                })
                .into("LabenuSystem_Hobby")
        } catch (error) {
            console.log("insertHobby", error)
        }

    }

    async insertEstudante_Hobby(id: string, idEstudante: string, idHobby: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: id,
                    estudante_id: idEstudante,
                    hobby_id: idHobby
                })
                .into("LabenuSystem_Estudante_Hobby")
        } catch (error) {
            console.log("insertEstudante_Hobby", error)
        }

    }

}