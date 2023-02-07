import { SongDB } from "../types"; 
import { BaseDatabase } from "./BaseDatabase";



// classe de database para os métodos da tabela songs
export class SongDatabase extends BaseDatabase {
    public static TABLE_SONGS = "songs"

    public async findSongs (q: string | undefined) {
        let songsDB

        if (q) {
            const result: SongDB[] = await BaseDatabase
                .connection(SongDatabase.TABLE_SONGS)
                .where("name", "LIKE", `%${q}%`)
            songsDB = result
        } else {
            const result: SongDB[] = await BaseDatabase
                .connection(SongDatabase.TABLE_SONGS)
            songsDB = result
        }

        return songsDB
    }

    public async findSongById(id: string) {
        const [ SongDB ]: SongDB[] | undefined[] = 
        await BaseDatabase
            .connection(SongDatabase.TABLE_SONGS)
            .where({ id })

        return SongDB
    }

    public async insertSong(newSongDB: SongDB) {
        await BaseDatabase
            .connection(SongDatabase.TABLE_SONGS)
            .insert(newSongDB)
    }

    public async updateSong(editedSongDB: SongDB, id: string) {
        await BaseDatabase.connection(SongDatabase.TABLE_SONGS)
            .update(editedSongDB)
            .where({ id })
    }
    
    public async deleteSong(id: string) {
        await BaseDatabase.connection(SongDatabase.TABLE_SONGS)
            .del()
            .where({ id })
    }

    
}
