import express, { Request, Response } from "express";
import cors from "cors";
import { SongController } from "./controller/SongController";


const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});


// Endpoint para testar a conexao com o banco de dados
app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});


const songController = new SongController() // instanciando a classe songController que contém as funções assíncronas dos enpoints
// retorna a tabela de músicas (songs)
app.get("/songs", songController.getSongs)


// endpoint para criar uma música
app.post("/songs", songController.createSong)


// editar uma música buscada por ID
// apenas "artist", "name" e "total_views" são obrigatórios no body
app.put("/songs/:id", songController.editSong)


// deletar uma música da tabela por ID
app.delete("/songs/:id", songController.deleteSong)