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
}
