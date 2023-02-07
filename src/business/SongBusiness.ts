import { SongDatabase } from "../database/SongDatabase";
import { Song } from "../models/Song";
import { SongDB } from "../types";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

export class SongBusiness {

    // CLASSE PARA CONTROLE DOS ENPOINTS DE CRUD DA TABELA SONGS

    public getSongs = async (input: any) => {
        const songDatabase = new SongDatabase()
        const SongDB = await songDatabase.findSongs(input)

        const songs: Song[] = SongDB.map((SongDB) => new Song(
            SongDB.id,
            SongDB.artist,
            SongDB.name,
            SongDB.uploaded_at,
            SongDB.total_views
        ))

        const output = {"Lista de todas as músicas ": songs}

        return output
        }

    public createSong = async (input: any) => {
        const { id, artist, name, uploaded_at, total_views } = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string");
        } 
        if (id[0] !== "s") {
            throw new BadRequestError("'id' deve começar com a letra 's'");
        }
      
        if (typeof artist !== "string") {
            throw new BadRequestError("'artist' deve ser string");
        }
        if (artist.length < 2) {
            throw new BadRequestError("'artist' deve ter pelo menos 2 caracteres");
        }
    
        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string");
        }
        if (name.length < 2) {
            throw new BadRequestError("'name' deve ter pelo menos 2 caracteres");
        }
    
        if (typeof uploaded_at !== "string") {
            throw new BadRequestError("'uploaded_at' deve ser string");
        }

        if (typeof total_views !== "number") {
            throw new BadRequestError("'total_views' deve ser number");
        }

        
        const songDatabase = new SongDatabase()
        const songDBExists = await songDatabase.findSongById(id)

        if (songDBExists) {
        throw new BadRequestError("'id' já existe");
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

    public editSong = async (input: any) => {

        const { newArtist, newName, newTotalViews, newId, paramsId } = input

        const songDatabase = new SongDatabase()
        const songDBExists = await songDatabase.findSongById(paramsId)

        if (!songDBExists) {
        throw new NotFoundError("Esse vídeo não existe");
        } else if (songDBExists) {
            if (typeof newArtist !== "string" && typeof newArtist !== undefined) {
                throw new BadRequestError("Tipo de artist inválido");
            }
            if (newArtist.length < 2) {
                throw new BadRequestError("'artist' deve ter pelo menos 2 caracteres");
            }

            if (typeof newName !== "string" && typeof newName !== undefined) {
                throw new BadRequestError("Tipo de name inválido");
            }
            if (newName.length < 2) {
                throw new BadRequestError("'Name' deve ter pelo menos 2 caracteres");
            }

            if (
                typeof newTotalViews !== "number" &&
                typeof newTotalViews !== undefined
            ) {
                throw new BadRequestError("Tipo de totalViews inválido");
            }
            if (newTotalViews < 1) {
                throw new BadRequestError("O número de views não pode ser menor do que 1");
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

        const output = {
            message: "Música editada com sucesso!",
            Música: editedSongDB,
        }

        return output
    }
        }

    public deleteSong = async (input: any) => {

        
        const songDatabase = new SongDatabase();
        const songToDelete = await songDatabase.findSongById(input);
    
        if(!songToDelete) {
            throw new NotFoundError("Essa música não existe no banco de dados");
        }
    
        await songDatabase.deleteSong(input)

        const output = `Música de id '${input}' deletada com sucesso`

        return output
        }
}