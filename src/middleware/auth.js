const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user; // Establecer req.user desde la sesión
        console.log("Usuario autenticado:", req.user); // Agrega un log para verificar
        next();
    } else {
        return res.status(401).json({ message: 'Debes estar logueado para acceder' });
    }
};

const authenticateAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        req.user = req.session.user; // Establecer req.user desde la sesión
        next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador' });
    }
};



export { authenticateUser, authenticateAdmin };

