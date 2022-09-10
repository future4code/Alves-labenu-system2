import app from "./app";
import { DocenteController } from "./endpoints/DocenteController";
import { EstudanteController } from "./endpoints/EstudanteController";
import { TurmaController } from "./endpoints/TurmaController";

const turmaController = new TurmaController()
const estudanteController = new EstudanteController()
const docenteController = new DocenteController()


app.get("/turma", turmaController.getTurma)
app.get("/estudante", estudanteController.getEstudanteName)
app.get("/docente", docenteController.getDocente)


app.post("/turma", turmaController.createTurma)
app.post("/estudante/:id", estudanteController.postTurmaEstudante)
app.post("/estudante", estudanteController.createEstudante)
app.post("/docente", docenteController.createDocente)


app.put("/turma/:id", turmaController.putTurmaModulo)
app.put("/docente/:id", docenteController.putTurmaDocente)


