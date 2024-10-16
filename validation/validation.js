import Joi from "joi";

// Function que va a recibir data y en base a eso acciona
export const moviesValidation = (data) => {
    //Schemas
    const genreValSchema = Joi.object ({
        name: Joi.string().min(3).required(),  // El nombre de la plataforma es obligatorio
        description: Joi.string().required()
    });

    const platformValSchema = Joi.object ({
        name: Joi.string().required(),  // El nombre de la plataforma es obligatorio
        url: Joi.string().uri().required()  // La URL debe ser válida y obligatoria
    });

    const movieValSchema = Joi.object({
        title: Joi.string().min(4).required(),  // Título de la película, mínimo 4 caracteres
        description: Joi.string().min(30).required(),  // Descripción de la película, mínimo 30 caracteres
        genre: Joi.array().items(genreValSchema).min(1).required(),  // Lista de géneros, al menos 1 requerido
        platforms: Joi.array().items(platformValSchema).min(1).required()  // Lista de plataformas, al menos 1 requerido
    });

    return movieValSchema.validate(data); //Retornamos la validación
}

export const usersValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        //Recibe un array y en.items indicamos qué validaciones deben cumplir los items del array
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    });
    
    return schema.validate(data)
}