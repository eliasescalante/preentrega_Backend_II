class UserDTO {
    constructor(user) {
        this.email = user.email;
        this.role = user.role; 
        this.cart = user.cart;
    }
}

export default UserDTO; 