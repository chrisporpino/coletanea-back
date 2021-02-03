import { Request, Response } from "express";
import { SongBusiness } from "../business/SongBusiness";
import { SearchSongDTO } from "../model/Song";

export default class SongController {
  
  public searchSong = async (req: Request, res: Response) => {
    try {

      const searchData: SearchSongDTO = {
        id: req.query.id as string,
        number: req.query.number as string,
        title: req.query.title as string,
        orderBy: req.query.orderBy as string || "number",
        orderType: req.query.orderType as string || "ASC",
        page: Number(req.query.page) || 1
      }
      
      const result = await new SongBusiness().searchSong(searchData);
      
      res.status(200).send(result);

    } catch (err) {
      res.status(400).send({
        message: err.message || err.sqlMessage,
      });
    }
  };
}