import { Request, Response } from "express";
import { TurmaData } from "../data/TurmaData";
import { Turma } from "../model/Turma";

export class TurmaController {

    async createTurma(req: Request, res: Response) {
        try {
            const { name, modulo } = req.body

            if (!name) {
                res.statusCode = 401
                throw new Error("O nome deve ser passado.");
            }

            const id = Date.now() % 10000
            const newId = id.toString()
            const newTurma = new Turma(newId, name, modulo)

            const turma = new TurmaData()
            await turma.insertTurma(newTurma)

            res.status(201).send('Turma criada com sucesso')

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }

    async getTurma(req: Request, res: Response) {
        try {
            const turmaData = new TurmaData()
            const turmas = await turmaData.selectTurma()

            if (!turmas.length) {
                res.statusCode = 404
                throw new Error("Não há turmas cadastradas!")
            }

            res.status(200).send(turmas)

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }

    async putTurmaModulo(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { modulo } = req.body

            if (!id || !modulo) {
                res.statusCode = 401
                throw new Error("O novo módulo e o id devem ser informados!")
            }

            const moduloData = new TurmaData()
            await moduloData.editModulo(id, modulo)

            res.status(200).send("Módulo alterado!")

        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })

        }
    }
}