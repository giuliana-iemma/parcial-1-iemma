import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { usersValidation, usersLoginValidation } from "../validation/validation.js";

dotenv.config();

const secretKey = process.env.SECRET;

export const createUser = async (req, res) => {
        //Llamo la función que hicimos para validar y le paso el body.
        const {error} = usersValidation(req.body);

        if(error) {
            return res.status(400).json({error: error.details[0].message}); 
        }

    try{
        //Obtenemos los datos enviados por body
        const { name, lastname, password, email } = req.body;
        
         // Verificamos si ya existe un usuario con el mismo correo electrónico
         const existingUser = await Users.findOne({ email });

             // Si existe, devolvemos un error
        if (existingUser) {
            return res.status(400).json({ error: "Este correo electrónico ya está en uso." });
        }

        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10) 

        // Creamos un nuevo usuario con la contraseña hasheada
        const newUser = new Users ({
            name,
            lastname,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    }catch (err) {
        res.status(400).json({error: err.message})
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const users = await Users.find();

        res.json(users);
    } catch (err){
    res.status(400).json({error: err.message})
    }
}

export const getUserById = async (req, res) => {
    try{
        const user = await Users.findById(req.params.id);

        if(!user) return res.status(404).json({error: "Usuario no encontrado"});
        res.json (user);
    }catch (err) {
        res.status(400).json({error: err.message})
    }
}

export const loginUser = async (req, res) => {
     //Llamo la función que hicimos para validar y le paso el body.
     const {error} = usersLoginValidation(req.body);

     if(error) {
         return res.status(400).json({error: error.details[0].message}); 
     }

    try{
        //Obtenemos los datos enviados por el usuario
        const {email, password} = req.body;
        //Buscamos el usuario en la ddbb por email
        const user = await Users.findOne({email});

        //Si no lo encuentra, devuelve error
        if(!user) {
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        //Comparamos la contraseña ingresadacon la hasheada y guardada en la ddbb
        const validPassword = await bcrypt.compare(password, user.password);

        //Si no coincide, devolvemos error
        if (!validPassword) {
            return res.status(401).json({message: "Contraseña incorrecta"});
        }

        //Generamos el JWT
        const token = jwt.sign(
            {   id: user._id, 
                email: user.email, 
                issuedAt: Math.floor(Date.now() / 1000) //Identificamos cuándo fue generado el token y redondeamos el número para obtener el dato en segundos e identificar mejor. Esto sirve para obtener diferentes tokens cada vez que el usuario inicia sesión
            }
            , secretKey, 
            { expiresIn: '1h' });


        res.status(200).json({token, name: user.name, });
    }catch (error){
        res.status(400).json({error: error.message});
    }
   
}

export const updateUser = async (req, res) => {
    try {
        //Obtenemos el Id de los parámetros y encontramos al usuario
        let userId = req.params.id;
        let user = await Users.findById(req.params.id);

        if(!user) {
            return res.status(404).json({message: "Usuario no encontrado"})
        } 

        //Chequeamos si el usuario quiere actualizar la contraseña
        if(req.body.password) {
            const newSalt = await bcrypt.genSalt(10); // Generamos un nuevo salt para evitar problemas de seguridad
            req.body.password = await bcrypt.hash(req.body.password, newSalt); // Hasheamos la nueva contraseña
        }   

        //Actualizamos los datos del usuario
        user = await Users.findByIdAndUpdate(userId, req.body, { new: true }); // Devolvemos el documento actualizado

        //Retornamos el usuario actualizado
        return res.status(200).json(user);
    }catch (err) {
        return res.status(400).json({ error: err.message });
    }
   
}

export const deleteUser = async (req, res) => {
    try{
        const deletedUser = await Users.findByIdAndDelete(req.params.id);

        res.status(200).json(deletedUser);
    } catch (err){
        res.status(400).json({error: err.message})
    }
}

