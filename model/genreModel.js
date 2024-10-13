import mongoose, {Schema} from "mongoose"

const genreSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true}
})

// export default mongoose.model('genres', genreSchema);

export default genreSchema;
