import express from "express"
import { createMovie, getMoviesByGenre,  getMoviesByName, getMovies, getMoviesById, getMoviesSortedTitle, getMoviesPagination, updateMovies, deleteMovies } from "../controllers/moviesController.js" 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
const secretKey = process.env.SECRET; //Obtenemos la clave secreta desde las variables de entorno

const router = express.Router();//Creo una nueva instancia del enrutador de express

//Token de autenticación
const auth = (req, res, next) => {
    const getToken = req.headers.authorization;

    if(getToken){
        const token = getToken.split(" ")[1];
        jwt.verify(token,secretKey, (err, paylod) => {
            if (err) {
                return res.sendStatus(403).send("forbidden");
            } 

            req.user = {id: paylod.id, email: paylod.email}
            next()
        })
    }
}

//CREATE
router.post('/movies', auth, createMovie);

//READ
router.get('/movies', auth, getMovies)
router.get('/movies/pagination/:page/:limit', auth,  getMoviesPagination) //:page numero de página , :limit cantidad a mostrar por página
router.get('/movies/:id', auth, getMoviesById)
router.get('/movies/title/:title', auth, getMoviesByName)
router.get('/movies/search/genre', auth, getMoviesByGenre)
// router.get('/movies/genre/platform', getMoviesByPlatform);
router.get('/movies/sorted/:order', auth, getMoviesSortedTitle) //Ruta para obtener las rutas en orden alfabético


//UPDATE
router.put('/movies/:id', auth, updateMovies)

//DELETE
router.delete('/movies/:id', auth, deleteMovies)

//Exporto el objeto router
export default router;