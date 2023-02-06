import { SongDB } from "../types";
import { BaseDatabase } from "../database/BaseDatabase";
import { Request, Response } from "express"
import { SongDatabase } from "../database/SongDatabase";
import { Song } from "../models/Song";
import { SongBusiness } from "../business/SongBusiness";

export class SongController extends BaseDatabase {

    public getSongs = async(req: Request, res: Response) =>{

        try {

            const q = req.query.q as string | undefined

            const songBusiness = new SongBusiness()
            const output = await songBusiness.getSongs(q)
            
            res.status(200).send(output) 
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

            const input = {
                id: req.body.id, 
                artist: req.body.artist, 
                name: req.body.name, 
                uploaded_at: req.body.uploaded_at, 
                total_views: req.body.total_views
            }

            const songBusiness = new SongBusiness()
            const output = await songBusiness.createSong(input)
            
            res.status(200).send(output);

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

    public deleteSong = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
        
            const songDatabase = new SongDatabase();
            const songToDelete = await songDatabase.findSongById(id);
        
            if(!songToDelete) {
              res.status(404)
              throw new Error("Essa música não existe no banco de dados");
            }
        
            await songDatabase.deleteSong(id)
        
            res.status(200).send(`Música de id '${id}' deletado com sucesso`)
        
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
    }
}
