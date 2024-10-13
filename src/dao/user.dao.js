import UserModel from "./models/userModel.js";

class UserDao {
    async findById(id){
    // Método para encontrar un usuario por su ID
        return await UserModel.findById(id);
    }

    async findOne(query){
    // Método para encontrar un usuario por su correo electrónico
        return await UserModel.findOne(query);
    }

    async save(userData){
    // Método para guardar un usuario en la base de datos
        const user = new UserModel(userData);
        return await user.save();
    }
}
export default new UserDao();