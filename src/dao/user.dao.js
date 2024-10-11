import UserModel from "./models/userModel.js";

class UserDao {
    async findById(id){
        return await UserModel.findById(id);
    }

    async findOne(query){
        return await UserModel.findOne(query);
    }

    async save(userData){
        const user = new UserModel(userData);
        return await user.save();
    }
}

export default new UserDao();