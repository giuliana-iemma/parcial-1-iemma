import express from "express"
import {getAllGenres, getGenreById, getGenreByName, createGenre, updateGenre, deleteGenre} from "../controllers/genreControllers.js"

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config(); //Para poder acceder a las variables de entorno

const secretKey = process.env.SECRET; //Obtenemos la clave secreta desde las variables de entorno
const router = express.Router();

const auth = (req, res, next) => {
    const getToken = req.headers.authorization;

    if(getToken){
        const token = getToken.split(" ")[1];
        jwt.verify(token,secretKey, (err, paylod) => {
            if (err) {
                return res.sendsStatus(403).send("forbidden");
            } 

            req.user = {id: paylod.id, email: paylod.email}
            next()
        })
    }
}

router.post('/genres', auth, createGenre);
router.get('/genres', auth,  getAllGenres);
router.get('/genres/:id', auth, getGenreById);
router.get('/genres/name/:name', auth, getGenreByName);
router.put('/genres/:id', auth, updateGenre);
router.delete('/genres/:id', auth, deleteGenre);

export default router;