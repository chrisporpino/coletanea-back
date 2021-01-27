import express from 'express';
import { createSong } from '../endpoints/createSong';
import { getAllSongs } from '../endpoints/getAllSongs';
import { getSongDetails } from '../endpoints/getSongDetails';

export const songsRouter = express.Router();

songsRouter.get('/list', getAllSongs);
songsRouter.get('/details/:id', getSongDetails);
songsRouter.post('/create', createSong);