import { SearchSongDTO, Song, SongOutputDTO } from "../model/Song";
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
        content,
      })
      .into(SongDatabase.TABLE_NAME);
  }

  //AllSongsOutputDTO
  public async getSongs(): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT id, category, number, title
      FROM coletanea_SONGS
      ORDER BY number ASC;
    `);
    return result[0];

    // return Song.convertToUserModel(result[0]);

    // return {
    //   id: result[0].id,
    //   category: result[0].category,
    //   number: result[0].number,
    //   title: result[0].title
    //   // content: result[0].content
    // };
  }

  public async getSongById(id: string): Promise<SongOutputDTO> {
    const result = await this.getConnection()
      .select("*")
      .from(SongDatabase.TABLE_NAME)
      .where({ id });
    // return Song.convertToUserModel(result[0]);

    return {
      id: result[0].id,
      category: result[0].category,
      number: result[0].number,
      title: result[0].title,
      content: result[0].content
    }
  }

  public async searchSong(searchData: SearchSongDTO): Promise<Song[]> {
    try {
      const resultsPerPage: number = 20;
      const offset: number = resultsPerPage * (searchData.page - 1)

      const result = await this.getConnection().raw(`
        SELECT id, number, title FROM ${SongDatabase.TABLE_NAME}
        WHERE title LIKE "%${searchData.title.toUpperCase()}%"
        ORDER BY ${searchData.orderBy} ${searchData.orderType}
        LIMIT ${resultsPerPage}
        OFFSET ${offset};
    `);

    return result[0];

    } catch (err) {
      throw new Error(err.sqlMessage);
    }
  }
}
