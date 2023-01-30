const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;

// Rutas Protegidas (Middleware)

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ error: 'Acceso no autorizado.' })

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data
        next() // continuamos

    } catch (error) {
        res.status(422).json({error: 'La solicitud no pudo ser procesada.'})
    }
}

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === "admin"){
                return next();
            }
        }

        return res.status(403).send({
            message: 'Se requieren roles de Administrador.'
        });

    } catch (error) {
        return res.status(500).send({
           message: 'Se produjo un error mientras se validaba el rol del usuario.' 
        });
    }
},

isModerator = async (req, res, next) => {
    try {

        const user = await User.findByPk(req.user.id);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === "moderator"){
                return next();
            }
        }

        return res.status(403).send({
            message: 'Se requieren roles de Moderador.'
        });

    } catch (error) {
        return res.status(500).send({
           message: 'Se produjo un error mientras se validaba el rol del usuario.'
        });
    }
},

isModeratorOrAdmin = async (req, res, next) => {
    try {

        const user = await User.findByPk(req.user.id);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === "moderator"){
                return next();
            }
            if(roles[i].name === "admin"){
                return next();
            }
        }

        return res.status(403).send({
            message: 'Se requieren roles de Moderador o Administrador.'
        });

    } catch (error) {
        return res.status(500).send({
           message: 'Se produjo un error mientras se validaba el rol del usuario.' 
        });
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin,
};

module.exports = authJwt;