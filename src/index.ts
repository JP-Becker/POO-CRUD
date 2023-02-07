import express from "express";
import cors from "cors";
import { songRouter } from "./router/songRouter";
import { courseRouter } from "./router/courseRouter";


const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

// ------- MÉTODOS ANTIGOS USANDO APENAS O 'CONTROLLER' -------
//const songController = new SongController() // instanciando a classe songController que contém as funções assíncronas dos enpoints
// // retorna a tabela de músicas (songs)
// app.get("/songs", songController.getSongs)
// // endpoint para criar uma música
// app.post("/songs", songController.createSong)
// // editar uma música buscada por ID
// // apenas "artist", "name" e "total_views" são obrigatórios no body
// app.put("/songs/:id", songController.editSong)
// // deletar uma música da tabela por ID
// app.delete("/songs/:id", songController.deleteSong)
// -------------------------------------------------------------------

app.use("/songs", songRouter) // os métodos CRUD agora estão todos concentrados no songRouter

app.use("/courses", courseRouter) // os métodos CRUD de courses estão concentrados no courseRouter