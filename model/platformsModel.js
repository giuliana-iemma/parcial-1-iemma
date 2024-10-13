import mongoose, {Schema} from "mongoose"

const platformSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    url: {type: String, required: true}
});

// export default mongoose.model('platforms', platformSchema);
export default platformSchema;