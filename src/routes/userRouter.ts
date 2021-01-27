import express from 'express';
import { login } from '../endpoints/login';
import { signUp } from '../endpoints/signUp';

export const userRouter = express.Router();// linha que cria o gerenciador de rotas

userRouter.post('/signup', signUp);
userRouter.post('/login', login);