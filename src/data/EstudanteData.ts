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

    async selectEstudanteName(name: string) {
        const result = await this.getConnection()
            .select("name")
            .where("name", "LIKE", `%${name}%`)
            .from("LabenuSystem_Estudante")
        return result
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

    async editTurmaEstudante(estudante_id: string, turma_id: string) {
        await this.getConnection()
            .update({
                turma_id: turma_id
            })
            .into("LabenuSystem_Estudante")
            .where("id", estudante_id)
    }

    async addTurmaEstudante(id: string, turma_id: string) {
        console.log(id, turma_id)
        await this.getConnection().raw(`
            update LabenuSystem_Estudante set turma_id = ${turma_id}
            where id = ${id}
        `)
    }
}
