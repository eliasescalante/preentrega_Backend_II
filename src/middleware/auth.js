// Middleware para autenticar al usuario
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user;
        next();
    } else {
        return res.status(401).json({ message: 'Debes estar logueado para acceder' });
    }
};

const authenticateAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        req.user = req.session.user;
        next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador' });
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/api/sessions/current');
    }
    next();
};

export { authenticateUser, authenticateAdmin, isAuthenticated };

