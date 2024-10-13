class UserDTO {
    // Clase DTO para usuarios
    constructor(user) {
        this.first_name = user.first_name;
        this.email = user.email;
        this.role = user.role;
        this.id = user._id
        this.cart = user.cart;
    }
}
export default UserDTO; 