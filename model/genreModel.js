import mongoose, {Schema} from "mongoose"

const genreSchema = new mongoose.Schema ({
    name: {String, required: true}
})

export default mongoose.model('genres', genreSchema);