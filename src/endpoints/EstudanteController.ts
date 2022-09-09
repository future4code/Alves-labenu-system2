import { Request, Response } from "express";
import { EstudanteData } from "../data/EstudanteData";
import { Estudante } from "../model/Estudante";

export class EstudanteController {

    async createEstudante(req: Request, res: Response) {
        try {
            const { name, email, date_nasc, hobby_name } = req.body

            if (!name || !email || !date_nasc || !hobby_name) {
                res.statusCode = 404
                throw new Error("O nome, email, data de nascimento e hobby devem ser passados.");
            }

            const id = Date.now() % 10000
            const newId = id.toString()
            
            const new_date = date_nasc.split("/")
            const deadlineInReverse = new_date.reverse()
            const deadlineForAmerican = deadlineInReverse.join("/")
            
            const newEstudante = new Estudante(newId, name, email, deadlineForAmerican, hobby_name)
            const estudante = new EstudanteData()
            await estudante.insertEstudante(newEstudante)
            res.status(201).send('Estudante criado')
        } catch (error: any) {
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }
}