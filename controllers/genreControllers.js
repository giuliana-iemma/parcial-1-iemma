import express from "express"
import{ Genre } from "../model/genreModel.js"
import { moviesValidation } from "../validation/validation.js";

//CREATE
export const createGenre = async (req, res) => {
     try {
        // Creo una nueva instancia del modelo Genre
        const newGenre = new Genre({...req.body });

          // Guardo el género en la base de datos
          const savedGenre = await newGenre.save();

          // Devuelve el género guardado
          return res.status(201).json(savedGenre);
      } catch (err) {
          return res.status(400).json({ error: err.message });
      }
}

//READ
export const getAllGenres = async (req, res) => {
    try{
        const genres = await Genre.find();

        res.json(genres)
    } catch(err){
        res.status(400).json({error: err.message})
    }
}

export const getGenreById = async (req, res) => {
    try{
        //Encuentro el género usando el parámetro id de la url
        const genre = await Genre.findById(req.params.id);

        //Si no encuentra nada, 404
        if(!genre) return res.status(404).json({error: "not found"});

        res.json(genre)
    } catch(err){
        //Si hay error
        res.status(400).json({error: err.message})
    }
}

export const getGenreByName = async (req, res) => {
    try {
        // Obtener el título de la URL y reemplazar "-" por espacios
        const { name } = req.params; 
        const formatedName  = name.replace(/-/g, ' '); // Reemplazar guiones por espacios

        const genres = await Genre.find({ name: { $regex: formatedName, $options: 'i' } }); // Búsqueda insensible a mayúsculas

        // Devuelve los géners encontradas
        res.status(201).json(genres);
        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//UPDATE
export const updateGenre = async (req, res) => {
    try{
        //El primer parametro es el id el otro es lo que mellega por body. 
        //Agrego new: true para que muestre el dato luego de realizado el cambio
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json(updatedGenre);
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//DELETE
export const deleteGenre = async (req, res) => {
    try{
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);

        res.json(deletedGenre);

    } catch(err){
        res.status(400).json({error: err.message})
    }
}
