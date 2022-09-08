import { Request, Response } from "express";
import { TurmaData } from "../data/TurmaData";
import { Turma } from "../model/Turma";

export class TurmaController {

    async createTurma(req: Request, res: Response) {
        try {
            const { name, modulo } = req.body

            if (!name) {
                throw new Error("O id, name e modulo devem ser passados.");
            }

            const id = Date.now() % 10000
            const newId = id.toString()
            const newTurma = new Turma(newId, name, modulo)

            const turma = new TurmaData()
            await turma.insertTurma(newTurma)
            res.status(201).send('Turma criada')
        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }
}