import app from "./app";
import { TurmaController } from "./endpoints/TurmaController";

const turmaController = new TurmaController()

app.post("/turma", turmaController.createTurma)
app.get("/turma", turmaController.getTurma)
app.put("/turma/:id", turmaController.putTurmaModulo)

// app()