const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario.js');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener token del header
            token = req.headers.authorization.split(' ')[1];

            // Verificar token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Adjuntar el usuario a la solicitud (excluyendo la contraseña)
            req.user = await usuario.findById(decoded.id).select('-password');

            next(); // Continuar a la ruta

        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token fallido.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token.' });
    }
};

module.exports = { protect };