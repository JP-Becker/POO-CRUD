import { SongDatabase } from "../database/SongDatabase";
import { Song } from "../models/Song";
import { SongDB } from "../types";

export class SongBusiness {
    public createSong = async (input: any) => {
        const { id, artist, name, uploaded_at, total_views } = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string");
        } 
        if (id[0] !== "s") {
            throw new Error("'id' deve começar com a letra 's'");
        }
      
        if (typeof artist !== "string") {
            throw new Error("'artist' deve ser string");
        }
        if (artist.length < 2) {
            throw new Error("'artist' deve ter pelo menos 2 caracteres");
        }
    
        if (typeof name !== "string") {
            throw new Error("'name' deve ser string");
        }
        if (name.length < 2) {
            throw new Error("'name' deve ter pelo menos 2 caracteres");
        }
    
        if (typeof uploaded_at !== "string") {
            throw new Error("'uploaded_at' deve ser string");
        }

        if (typeof total_views !== "number") {
            throw new Error("'total_views' deve ser number");
        }

        
        const songDatabase = new SongDatabase()
        const songDBExists = await songDatabase.findSongById(id)

        if (songDBExists) {
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

        const output = {
            message: "Vídeo criado com sucesso",
            video: newSong,
            }

        return output;
    }
}