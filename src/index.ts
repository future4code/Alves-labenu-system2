import app from "./app";
import { EstudanteController } from "./endpoints/EstudanteController";
import { TurmaController } from "./endpoints/TurmaController";

const turmaController = new TurmaController()
const estudanteController = new EstudanteController()

app.get("/turma", turmaController.getTurma)
app.post("/turma", turmaController.createTurma)
app.put("/turma/:id", turmaController.putTurmaModulo)

app.post("/estudante", estudanteController.createEstudante)

// app()