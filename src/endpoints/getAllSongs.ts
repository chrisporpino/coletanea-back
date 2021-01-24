import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    
    const userBusiness = new UserBusiness();
    const songs = await userBusiness.getAllSongs(token);

    res.status(200).send(songs)
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
  await BaseDatabase.destroyConnection();
}