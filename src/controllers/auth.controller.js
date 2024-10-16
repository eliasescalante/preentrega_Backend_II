import userService from '../services/user.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login(email, password);
        req.session.user = {
            _id: user._id,
            role: user.role
        };

        res.status(200).send("Inicio de sesión exitoso");
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(401).send(error.message);
    }
};
