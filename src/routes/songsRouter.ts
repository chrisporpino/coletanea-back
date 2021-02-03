import express from 'express';
import SongController from '../controller/SongController';
import { createSong } from '../endpoints/createSong';
import { getAllSongs } from '../endpoints/getAllSongs';
import { getSongDetails } from '../endpoints/getSongDetails';

export const songsRouter = express.Router();

const songController = new SongController();

songsRouter.get('/list', getAllSongs);
songsRouter.post('/create', createSong);
songsRouter.get('/search', songController.searchSong);
songsRouter.get('/:id', getSongDetails);