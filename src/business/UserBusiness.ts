import { SongDatabase } from "../data/SongDataBase";
import { UserDatabase } from "../data/UserDataBase";
import { Song } from "../model/Song";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  
  public async signUp(name: string, email: string, password: string): Promise<string> {

    if (!name || !email || !password) {
      throw new Error(
        "Insira todas as informações necessárias para o cadastro"
      );
    }

    if (password.length < 6) {
      throw new Error("A senha deve conter no mínimo seis caracteres");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.registerUser(id, name, email, hashPassword);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

    return token;
  }

  public async login(email: string, password: string): Promise<string>{

    const userDataBase = new UserDatabase();//dependência
    const user = await userDataBase.getUserByEmail(email);

    const hashManager = new HashManager();//dependência
    const isPasswordCorrect = await hashManager.compare(password, user.getPassword());

    if(!isPasswordCorrect) {
      throw new Error('Usuário ou senha errados');
    }//regra de negócio

    const authenticator = new Authenticator();//dependência
    const token = authenticator.generateToken({
      id: user.getId()
    });

    return token;
  }

  public async getAllSongs(token: string): Promise<Song>{

    const authenticator = new Authenticator();//dependecia
    // authenticator.verify(token);

    const songDatabase = new SongDatabase();//dependecia
    const songs = await songDatabase.getSongs()

    return songs;
  }
}
