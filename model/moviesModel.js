import mongoose, {Schema} from "mongoose"

const movieSchema = new mongoose.Schema({
    //Armo la estructura con los campos que va a tener el modelo
    title: {type: String, required: true},
    description: {type: String, required: true},
    //Documento embebebido
    genre: [genreSchema], //Array de géneros
    platforms: { type: [platformSchema], required: true }, //Array de plataformas donde puede ver la película. Es obligatorio ya que es el sentido de la API
});

//Le pongo un nombre y le asigno el schema a ese nombre
export default mongoose.model('movies', movieSchema);