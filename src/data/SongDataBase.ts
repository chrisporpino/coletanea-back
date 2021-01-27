import { Song } from "../model/Song";
import { BaseDatabase } from "./BaseDatabase";

export class SongDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "coletanea_SONGS";

  public async addSong(
    id: string,
    category: string,
    number: string,
    title: string,
    access_count: number,
    content: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        category,
        number,
        title,
        access_count,
        content
      })
      .into(SongDatabase.TABLE_NAME);
  }

  public async getSongs(): Promise<Song> {
    const result = await this.getConnection().raw(`
      SELECT id, category, number, title
      FROM coletanea_SONGS
      ORDER BY number ASC;
    `);
    return Song.convertToUserModel(result[0]);
  }

  public async getSongById(id: string): Promise<Song> {
    const result = await this.getConnection()
      .select("*")
      .from(SongDatabase.TABLE_NAME)
      .where({ id });
    return Song.convertToUserModel(result[0]);
  }
}
