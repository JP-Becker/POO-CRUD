import { SongDB } from "../types"; 
import { BaseDatabase } from "./BaseDatabase";

export class SongDatabase extends BaseDatabase {
    

    public static TABLE_SONGS = "songs"

    public async finSongs() {
        const songDB: SongDB[] = await BaseDatabase
            .connection(SongDatabase.TABLE_SONGS)

        return songDB
    }

    public async findSongById(id: string) {
        const [ songDB ]: SongDB[] | undefined[] = await BaseDatabase
            .connection(SongDatabase.TABLE_SONGS)
            .where({ id })

        return songDB
    }

    public async insertSong(newSongDB: SongDB) {
        await BaseDatabase
            .connection(SongDatabase.TABLE_SONGS)
            .insert(newSongDB)
    }
}
