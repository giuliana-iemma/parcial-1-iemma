import express from "express"
import { createMovie, getMoviesByGenre,  getMoviesByName, getMovies, getMoviesById, updateMovies, deleteMovies } from "../controllers/moviesController.js" 

//Creo una nueva instancia del enrutador de express
const router = express.Router();

//CREATE
router.post('/movies', createMovie);

//READ
router.get('/movies', getMovies)
router.get('/movies/:id', getMoviesById)
router.get('/search/title/:title', getMoviesByName)
router.get('/search/genre', getMoviesByGenre)

//UPDATE
router.put('/movies/:id', updateMovies)

//DELETE
router.delete('/movies/:id', deleteMovies)

//Exporto el objeto router
export default router;