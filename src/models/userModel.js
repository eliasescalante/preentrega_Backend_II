import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    age: { type: Number, required: true},
    password: { type: String, required: true},
    cart: { type: Schema.Types.ObjectId, ref: 'Cart'},
    role: { type: String, default: 'user'}
});

const UserModel = mongoose.model('usuarios', userSchema);

export default UserModel;
