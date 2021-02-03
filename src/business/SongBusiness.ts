import { SongDatabase } from '../data/SongDataBase';
import { SearchSongDTO } from '../model/Song';

export class SongBusiness {

  public async searchSong(searchData: SearchSongDTO) {

    const validOrderByValues = ["title", "number"]
    const validOrderTypeValues = ["ASC", "DESC"]

    if(!validOrderByValues.includes(searchData.orderBy)){
      throw new Error("Valores para \"orderBy\" devem ser \"title\" ou \"number\"")
    }

    if(!validOrderTypeValues.includes(searchData.orderType)){
      throw new Error("Valores para \"orderType\" devem ser \"ASC\" ou \"DESC\"")
    }

    if (!searchData.title){
      throw new Error("Informe um valor para \"title\"")
    }

    const result = await new SongDatabase().searchSong(searchData)

    if (!result.length){
      throw new Error("Nenhum louvor encontrado")
    }

    return result
  }
}