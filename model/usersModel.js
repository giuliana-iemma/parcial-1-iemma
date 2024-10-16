import mongoose, {Schema} from "mongoose"

const userSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});
//Le pongo un nombre y le asigno el schema a ese nombre
const Users = mongoose.model('Users', userSchema);
export default Users;