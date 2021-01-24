import knex from "knex";
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { AddressInfo } from "net";
import { signUp } from "./endpoints/signUp";
import { login } from "./endpoints/login";
import { getSongDetails } from "./endpoints/getSongDetails";
import { createSong } from "./endpoints/createSong";
import { getAllSongs } from "./endpoints/getAllSongs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', signUp);
app.post('/login', login);

app.get('/songs', getAllSongs);
app.get('/song/:id', getSongDetails);
app.post('/song/create', createSong);


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});