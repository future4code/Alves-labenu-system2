import { Request, Response } from "express";
import app from "./app";
import { TurmaController } from "./endpoints/TurmaController";
console.log("Teste")

const turmaController = new TurmaController()

app.post("/turma", turmaController.createTurma)
app.get("/teste", (req:Request, res:Response)=>{
    res.send('foi')
})

// app()