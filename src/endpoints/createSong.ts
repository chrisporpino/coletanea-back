import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { SongDatabase } from "../data/SongDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const createSong = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const authenticator = new Authenticator();
    authenticator.verify(token);

    const category = req.body.category;
    const number = req.body.number;
    const title = req.body.title;
    const access_count = req.body.access_count;
    const content = req.body.content;    

    if (!category || !number || !title || !content) {
      throw new Error("Insira todas as informações necessárias");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const songDatabase = new SongDatabase();
    await songDatabase.addSong(
      id,
      category,
      number,
      title,
      access_count,
      content
    );

    res.status(200).send({
      message: "Louvor adicionado no banco de dados com sucesso",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
  await BaseDatabase.destroyConnection();
};
