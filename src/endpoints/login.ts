import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const login = async (req: Request, res: Response) => {
  
  try {

    // loginData = {
      const email= req.body.email;
      const password= req.body.password;
    // };

    const userBusiness = new UserBusiness();
    const token = userBusiness.login( email, password );
    console.log("teste")

    res.status(200).send({
      message: "Usuário logado com sucesso",
      token,
    });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }

  await BaseDatabase.destroyConnection();
};
