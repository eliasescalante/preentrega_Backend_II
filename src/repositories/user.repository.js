import UserDao from "../dao/user.dao.js"; 

class UserRepository {
    async createUser(userData) {
    // Crea un nuevo usuario
        return await UserDao.save(userData); 
    }

    async getUserById(id) {
    // Obtiene un usuario por su id
        return await UserDao.findById(id); 
    }

    async getUserByEmail(email) {
    // Obtiene un usuario por su mail
        return await UserDao.findOne({email}); 
    }

}

export default  new UserRepository(); 