import app from "./app";
import { TurmaController } from "./endpoints/TurmaController";
console.log("Teste")

const turmaController = new TurmaController()

app.post("/turma", turmaController.createTurma)

// app()