import express from "express";
import { SongController } from "../controller/SongController";

export const songRouter = express.Router();

const songController = new SongController()

songRouter.get("/", songController.getSongs)
songRouter.post("/", songController.createSong)
songRouter.put("/:id", songController.editSong)
songRouter.delete("/:id", songController.deleteSong)