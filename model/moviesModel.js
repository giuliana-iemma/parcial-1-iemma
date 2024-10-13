import mongoose, {Schema} from "mongoose"
import genreSchema from '../model/genreModel.js'; 
import platformSchema from '../model/platformsModel.js'; 

 

const movieSchema = new mongoose.Schema({
    //Armo la estructura con los campos que va a tener el modelo
    title: {type: String, required: true},
    description: {type: String, required: true},
    //Documento embebebido
    genre: [genreSchema], //Array de géneros
    platforms: [platformSchema], //Array de plataformas donde puede ver la película. Es obligatorio ya que es el sentido de la API
});

//Le pongo un nombre y le asigno el schema a ese nombre
const Movie = mongoose.model('Movie', movieSchema);
export default Movie;