import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "coletanea_USERS";

  public async registerUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
    return User.convertToUserModel(result[0]);
  }

  // public async getUserByEmail(email: string): Promise<any> {
  //   try {
  //     const result = await this.getConnection()
  //       .select("*")
  //       .from(UserDatabase.TABLE_NAME)
  //       .where({ email });
  //     return result[0];
  //   } catch (error) {
  //     throw new Error(error.sqlMessage || error.message);
  //   }
  // }
}
