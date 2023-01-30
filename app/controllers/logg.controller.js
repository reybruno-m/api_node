const jwt = require('jsonwebtoken');
const db = require("../models");
const { promisify } = require('util');

const Log = db.logs;

// Obtener actividad del usuario logueado. 
exports.get = async(req, res, next) => {
    let activity = [];

    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        activity = await Log.findAll({
            where: {
                userId: decoded.id
            }
        });
    }

    res.status(200).send({ activity });
};

// Registrar actividad de usuario.
exports.store = async(user, ip, device, action) => {

    const Dataset = {
        userId: user,
        address: ip,
        device: device,
        action: action
    }

    // Registrar actividad
    Log.create(Dataset);
}