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

            const id = Date.now() % 1000000
            const newId = id.toString()

            const idEstudante = Date.now() % 100000
            const newIdEstudante = idEstudante.toString()

            const idHobby = Date.now() % 10000
            const newIdHobby = idHobby.toString()

            const new_date = date_nasc.split("/")
            const deadlineInReverse = new_date.reverse()
            const deadlineForAmerican = deadlineInReverse.join("/")

            const newEstudante = new Estudante(newIdEstudante, name, email, deadlineForAmerican, hobby_name)
            const estudanteData = new EstudanteData()

            const result = await estudanteData.selectHobby()
            // console.log(result)
            const findName = await result.find((resu: any) => resu.hobby_name === hobby_name)

            // console.log("findName", findName.hobby_id)


            if (findName) {
                console.log("to no if")
                await estudanteData.insertEstudante_Hobby(newId, newIdEstudante, findName.hobby_id)
                await estudanteData.insertEstudante(newEstudante)

            } else {
                console.log("entrei no else")
                await estudanteData.insertHobby(newIdHobby, hobby_name)
                await estudanteData.insertEstudante_Hobby(newId, newIdEstudante, newIdHobby)
                await estudanteData.insertEstudante(newEstudante)
            }


            res.status(201).send('Estudante criado')

        } catch (error: any) {
            console.log("erro catch", error)
            res.status(res.statusCode || 500).send({ message: error.message })
        }
    }
}