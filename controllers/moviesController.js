import express from "express"
import Movie from "../model/moviesModel.js"
import { moviesValidation } from "../validation/validation.js";

//CREATE
export const createMovie = async (req, res) => {
   /*   //Validación
    //Llamo la función que hicimos para validar y le paso el body.
    const {error} = moviesValidation(req.body);;

    //Si algo anda mal, retorna un error. Si existe ese error, entonces le damos status 400 y le decimos cuales son los detalles del error.
     if (error) return res.status(400).json({error: error.details[0].message})
    console.log(error);
 */

     try {
        // Creo una nueva instancia del modelo Movie
        const newMovie = new Movie({...req.body});

          // Guardo la película en la base de datos
          const savedMovie = await newMovie.save();

          // Devuelve la película guardada
          return res.status(201).json(savedMovie);
      } catch (err) {
          return res.status(400).json({ error: err.message });
      }
}

//READ
export const getMovies = async (req, res) => {
    try{
        const movies = await Movie.find();

        res.json(movies)
    } catch(err){
        res.status(400).json({error: err.message})
    }
}

export const getMoviesById = async (req, res) => {
    try{
        //Encuentro la película usando el parámetro id de la url
        const movie = await Movie.findById(req.params.id);

        //Si no encuentra nada, 404
        if(!movie) return res.status(404).json({error: "not found"});

        res.json(movie)
    } catch(err){
        //Si hay error
        res.status(400).json({error: err.message})
    }
}

export const getMoviesByName = async (req, res) => {
    try {
        // Obtener el título de la URL y reemplazar "-" por espacios
        const { title } = req.params; 
        const formattedTitle  = title.replace(/-/g, ' '); // Reemplazar guiones por espacios

        const movies = await Movie.find({ title: { $regex: formattedTitle, $options: 'i' } }); // Búsqueda insensible a mayúsculas

        // Devuelve las películas encontradas
        res.status(201).json(movies);
        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getMoviesByGenre = async (req, res) => {
    try {
        //Obtengo el género desde los parámetros
        const genres = req.query.genres.split('-').map(genre => genre.replace(/_/g, ' '));

        const movies = await Movie.find({
            'genre.name': { $in: genres }
        });   
        
        //Quiero que no distinga minúsculas y mayúsculas. No me salió con el documento embebido.

        // Devuelve las películas encontradas
        res.json(movies);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//UPDATE
export const updateMovies = async (req, res) => {
    try{
        //El primer parametro es el id el otro es lo que mellega por body. 
        //Agrego new: true para que muestre el dato luego de realizado el cambio
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json(updatedMovie);
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//DELETE
export const deleteMovies = async (req, res) => {
    try{
        const deteledMovie = await Movie.findByIdAndDelete(req.params.id);

        res.json(deteledMovie);

    } catch(err){
        res.status(400).json({error: err.message})
    }
}
