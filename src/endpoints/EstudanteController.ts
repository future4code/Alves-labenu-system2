import { Request, Response } from "express";
import { EstudanteData } from "../data/EstudanteData";
import { Estudante } from "../model/Estudante";

export class EstudanteController {

    async createEstudante(req: Request, res: Response) {
        try {
            const { name, email, date_nasc, hobby_name } = req.body

            if (!name || !email || !date_nasc || !hobby_name) {
                res.statusCode = 401
                throw new Error("O nome, email, data de nascimento e hobby devem ser passados.");
            }

            const id = Date.now() % 1000000
            const newId = id.toString()

            const idEstudante = Date.now() % 100000
            const newIdEstudante = idEstudante.toString()

            const idHobby = Date.now() % 10000
            const newIdHobby = idHobby.toString()

            const new_date = date_nasc.split("/")
            const deadlineInReverse = new_date.reverse()
            const deadlineForAmerican = deadlineInReverse.join("/")

            const estudanteData = new EstudanteData()
            const estudantes = await estudanteData.selectAllEstudante()
            const verificaEmailExiste = estudantes.find((estu: any) => estu.email === email)

            if (verificaEmailExiste) {
                res.statusCode = 401
                throw new Error('Erro, email já cadastrado!')
            }

            const newEstudante = new Estudante(newIdEstudante, name, email, deadlineForAmerican, hobby_name)

            const result = await estudanteData.selectHobby()
            const findName = await result.find((resu: any) => resu.hobby_name === hobby_name)

            if (findName) {
                await estudanteData.insertEstudante(newEstudante)
                await estudanteData.insertEstudante_Hobby(newId, newIdEstudante, findName.hobby_id)

            } else {
                await estudanteData.insertHobby(newIdHobby, hobby_name)
                await estudanteData.insertEstudante(newEstudante)
                await estudanteData.insertEstudante_Hobby(newId, newIdEstudante, newIdHobby)
            }

            res.status(201).send('Estudante criado')

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }

    async getEstudanteName(req: Request, res: Response) {
        try {

            const estudanteData = new EstudanteData()
            let name = req.query.name as string || ""

            const estudante = await estudanteData.selectEstudanteName(name)

            res.status(200).send(estudante)

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }

    async postTurmaEstudante(req: Request, res: Response) {
        try {
            const id = req.params.id
            const turma_id = req.body.turma_id

            const estudanteData = new EstudanteData()
            await estudanteData.addTurmaEstudante(id, turma_id)

            res.status(200).send("Turma alterada!")

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }
}