import { SongDB } from "../types";
import { BaseDatabase } from "../database/BaseDatabase";
import { Request, Response } from "express"
import { SongDatabase } from "../database/SongDatabase";
import { Song } from "../models/Song";

export class SongController extends BaseDatabase {

    public getSongs = async(req: Request, res: Response) =>{

        try {
            const q = req.query.q as string | undefined
    
            const songDatabase = new SongDatabase()
            const SongDB = await songDatabase.findSongs(q)
    
            const songs: Song[] = SongDB.map((SongDB) => new Song(
                SongDB.id,
                SongDB.artist,
                SongDB.name,
                SongDB.uploaded_at,
                SongDB.total_views
            ))
            res.status(200).send({"Lista de todas as músicas ": songs}) 
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
        }

    public createSong = async(req: Request, res: Response) => {
        try {
            const { id, artist, name, uploaded_at, total_views} = req.body

            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string");
            } 
            if (id[0] !== "s") {
                res.status(400);
                throw new Error("'id' deve começar com a letra 's'");
            }
          
            if (typeof artist !== "string") {
                res.status(400);
                throw new Error("'artist' deve ser string");
            }
            if (artist.length < 2) {
                res.status(400);
                throw new Error("'artist' deve ter pelo menos 2 caracteres");
            }
        
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("'name' deve ser string");
            }
            if (name.length < 2) {
                res.status(400);
                throw new Error("'name' deve ter pelo menos 2 caracteres");
            }
        
            if (typeof uploaded_at !== "string") {
                res.status(400);
                throw new Error("'uploaded_at' deve ser string");
            }

            if (typeof total_views !== "number") {
                res.status(400);
                throw new Error("'total_views' deve ser number");
            }

            
            const songDatabase = new SongDatabase()
            const songDBExists = await songDatabase.findSongById(id)

            if (songDBExists) {
            res.status(400);
            throw new Error("'id' já existe");
            }

            const newSong = new Song(
                id,
                artist, 
                name, 
                new Date().toISOString(), 
                total_views
            );

            const newSongDB: SongDB = {
                id: newSong.getId(),
                artist: newSong.getArtist(),
                name: newSong.getName(),
                uploaded_at: newSong.getUploadedAt(),
                total_views: newSong.getTotalViews()
            };

            await songDatabase.insertSong(newSongDB)

            res.status(200).send({
            message: "Vídeo criado com sucesso",
            video: newSong,
            });

        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
        }

    public editSong = async(req: Request, res: Response) => {
        try {
            const paramsId = req.params.id;

            const newId = req.body.id;
            const newArtist = req.body.artist;
            const newName = req.body.name;
            const newTotalViews = req.body.total_views;

            const songDatabase = new SongDatabase()
            const songDBExists = await songDatabase.findSongById(paramsId)

            if (!songDBExists) {
            res.status(400);
            throw new Error("Esse vídeo não existe");
            } else if (songDBExists) {
                if (typeof newArtist !== "string" && typeof newArtist !== undefined) {
                    res.status(400);
                    throw new Error("Tipo de artist inválido");
                }
                if (newArtist.length < 2) {
                    res.status(400);
                    throw new Error("'artist' deve ter pelo menos 2 caracteres");
                }

                if (typeof newName !== "string" && typeof newName !== undefined) {
                    res.status(400);
                    throw new Error("Tipo de name inválido");
                }
                if (newName.length < 2) {
                    res.status(400);
                    throw new Error("'Name' deve ter pelo menos 2 caracteres");
                }

                if (
                    typeof newTotalViews !== "number" &&
                    typeof newTotalViews !== undefined
                ) {
                    res.status(400);
                    throw new Error("Tipo de totalViews inválido");
                }
                if (newTotalViews < 1) {
                    res.status(400);
                    throw new Error("O número de views não pode ser menor do que 1");
                }

            const editedSong = new Song(
                newId,
                newArtist,
                newName,
                new Date().toISOString(),
                newTotalViews
            );

            const editedSongDB: SongDB = {
                id: editedSong.getId() || songDBExists.id,
                artist: editedSong.getArtist() || songDBExists.artist,
                name: editedSong.getName() || songDBExists.name,
                uploaded_at: editedSong.getUploadedAt() || songDBExists.uploaded_at,
                total_views: editedSong.getTotalViews() || songDBExists.total_views
            };

            await songDatabase.updateSong(editedSongDB, paramsId)

            res.status(200).send({
                message: "Música editada com sucesso!",
                Música: editedSongDB,
            });
            }
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}
