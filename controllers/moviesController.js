import express from "express"
import Movie from "../model/moviesModel.js"
import mongoose from "mongoose"
import { moviesValidation } from "../validation/validation.js";

//CREATE
export const createMovie = async (req, res) => {
    
    //Llamo la función que hicimos para validar y le paso el body.
    const {error, value} = moviesValidation(req.body);

    if(error) {
        return res.status(400).json({error: error.details[0].message}); 
    }

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

export const getMoviesPagination = async (req, res) =>{
    try{
        const page = req.params.page; //Número de página desde los parámetros

        const limit = req.params.limit; //Cantidad a mostrar por página 
    
        //Calculamos los documentos que se deben saltear de la lista teniendo en cuenta la página en la que estemos posicionados.
        //En la primera dará 0, por lo que no se saltarán documentos
        const skip = (page - 1) * limit; 
    
        const movies = await Movie.find()
            .skip(skip)
            .limit (limit);
    
        //Vamos a mostrar también el total de documentos a mostrar para que el usuario pueda ver cuántos le quedan por recorrer
        const totalMovies = await Movie.countDocuments();
    
        res.status(200).json({
            movies,
            currentPage: page,
            totalPages: Math.ceil (totalMovies / limit), //Mostramos el total de 
            totalMovies
        });
    } catch (err) {
        res.status(400).json({error: err.message})
    }
   
}

export const getMoviesSortedTitle = async (req,res) =>{
    try{
        const order = req.params.order;
        const orderLower = order.toLowerCase();
        let moviesSorted; 

        if (!order){
            res.status(400).json({ message: "Debes colocar A o D para indicar cómo quieres ordenar las películas"});
        } else if (orderLower == 'a'){
           moviesSorted = await Movie.find().sort({title: 1}); //1 para orden ascendente
        } else if(orderLower == 'd') {
          moviesSorted = await Movie.find().sort({title: -1}); //1 para orden ascendente
        } else {
            res.status(400).json ({message: "El valor ingresado no es correcto Revisa las instrucciones e intenta nuevamente"});
        }

        if(moviesSorted.length == 0){
            res.status(404).json ({message: "No se encontraron películas"});
        }

        res.status(200).json(moviesSorted);

    } catch (err) {
        res.status(400).json({  })
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
