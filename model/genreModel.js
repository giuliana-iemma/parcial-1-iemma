import mongoose, {Schema} from "mongoose"

const genreSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: false}
});

// export default mongoose.model('genres', genreSchema);
const Genre = mongoose.model('Genre', genreSchema);

export default genreSchema;

export{ Genre };
