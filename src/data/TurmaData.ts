import { Turma } from "../model/Turma";
import BaseDataBase from "./baseDateBase";

export class TurmaData extends BaseDataBase {

    async insertTurma(turma: Turma): Promise<void> {

        await this.getConnection()
            .insert(turma)
            .into("LabenuSystem_Turma")
    }
}