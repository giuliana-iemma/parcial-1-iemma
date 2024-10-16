import express from "express"
import { getAllUsers, getUserById, createUser, loginUser, updateUser, deleteUser } from "../controllers/usersController.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config(); //Para poder acceder a las variables de entorno

const secretKey = process.env.SECRET; //Obtenemos la clave secreta desde las variables de entorno
const router = express.Router(); //Para poder armar las rutas

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

router.get('/users', auth, getAllUsers)

router.get('/users/:id', auth, getUserById)

router.post('/users', createUser)

router.post('/login', loginUser)

router.put('/users/:id', auth, updateUser)

router.delete('/users/:id', auth, deleteUser)

export default router;