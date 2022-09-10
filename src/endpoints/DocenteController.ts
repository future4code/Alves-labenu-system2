import { Request, Response } from "express";
import { DocenteData } from "../data/DocenteData";
import { Docente } from "../model/Docente";

export class DocenteController {
    async createDocente(req: Request, res: Response) {
        try {
            const { name, email, date_nasc, turma_id} = req.body
            if (!name || !email || !date_nasc) {
                res.statusCode = 404
                throw new Error("O nome, email, data de nascimento e hobby devem ser passados.");
            }
            const id = Date.now() % 1000000
            const newId = id.toString()

            const idDocente = Date.now() % 100000
            const newIdDocente = idDocente.toString()

            const idEspecialidade = Date.now() % 10000
            const newIdEspecialidade = idEspecialidade.toString()

            const new_date = date_nasc.split("/")
            const deadlineInReverse = new_date.reverse()
            const deadlineForAmerican = deadlineInReverse.join("/")

            const newDocente = new Docente(newIdDocente, name, email, deadlineForAmerican, turma_id)
            const docenteData = new DocenteData()

            console.log("NovoProfessor", newDocente)
            await docenteData.insertDocente(newDocente)
            res.status(200).send("Docente criado")

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message  || "Erro do servidor"})

        }
    }
}