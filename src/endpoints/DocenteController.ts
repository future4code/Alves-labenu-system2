import { Request, Response } from "express";
import { DocenteData } from "../data/DocenteData";
import { Docente } from "../model/Docente";

export class DocenteController {
    async createDocente(req: Request, res: Response) {
        try {
            const { name, email, date_nasc, turma_id, especialidade_id} = req.body
            if (!name || !email || !date_nasc) {
                res.statusCode = 404
                throw new Error("O nome, email, data de nascimento e hobby devem ser passados.");
            }

            console.log(req.body)
            const id = Date.now() % 1000000
            const newId = id.toString()

            const idDocente = Date.now() % 100000
            const newIdDocente = idDocente.toString()

            const new_date = date_nasc.split("/")
            const deadlineInReverse = new_date.reverse()
            const deadlineForAmerican = deadlineInReverse.join("/")

            const newDocente = new Docente(newIdDocente, name, email, deadlineForAmerican, turma_id, especialidade_id)
            console.log("NovoProfessor", newDocente)
            const docenteData = new DocenteData()

            const result = await docenteData.selectEspecialidade()
            console.log(result)
            const findEspecialidade = await result.find((resu: any) => resu.id === especialidade_id)
            
            console.log("find", findEspecialidade)
            

            await docenteData.insertDocente(newDocente)
            await docenteData.insertDocente_Especialidade(newId, newIdDocente, findEspecialidade.id)
         

            res.status(200).send("Docente criado")

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message  || "Erro do servidor"})

        }
    }

    async getDocente(req: Request, res: Response) {
        try {

            const docenteData = new DocenteData()

            const docente = await docenteData.selectDocentes()

            res.status(200).send(docente)
            
        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }

    async putTurmaDocente(req: Request, res: Response) {
        try {
            const id = req.params.id
            const turma_id = req.body.turma_id

            const docenteData = new DocenteData()
            await docenteData.editTurmaDocente(id, turma_id)
            res.status(200).send("Turma Alterada")
        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
            
        }
    }
}