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

    async insertHobby(newIdHobby: string, hobby_name: string): Promise<void> {
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

    async insertEstudante_Hobby(id: string, estudante_id: string, hobby_id: string): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: id,
                    estudante_id: estudante_id,
                    hobby_id: hobby_id
                })
                .into("LabenuSystem_Estudante_Hobby")
        } catch (error) {
            console.log("insertEstudante_Hobby", error)
        }

    }

    async selectHobby() {

        const result = await this.getConnection().raw(`
            SELECT LabenuSystem_Hobby.id as hobby_id, LabenuSystem_Hobby.name as hobby_name, LabenuSystem_Estudante.id as estudante_id
            FROM LabenuSystem_Estudante_Hobby 
            JOIN LabenuSystem_Estudante 
            ON LabenuSystem_Estudante_Hobby.estudante_id = LabenuSystem_Estudante.id
            JOIN LabenuSystem_Hobby 
            ON LabenuSystem_Estudante_Hobby.hobby_id = LabenuSystem_Hobby.id
        `)
        return result[0]
    }
}

