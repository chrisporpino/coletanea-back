import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { SongDatabase } from "../data/SongDataBase";
import { Authenticator } from "../services/Authenticator";

export const getSongDetails = async(req: Request, res: Response) => {
  try {
    // const token = req.headers.authorization as string;
    const id = req.params.id as any;

    // const authenticator = new Authenticator();
    // authenticator.verify(token);

    const songDatabase = new SongDatabase();
    const song = await songDatabase.getSongById(id)

    res.status(200).send({
      songId: song.id,
      songCategory: song.category,
      songNumber: song.number,
      songTitle: song.title,
	    songContent: song.content,
	    // songAccess_count: song.getAccessCount()
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
  await BaseDatabase.destroyConnection();
}