const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../models");

const User = db.users;

// Contenido de acceso publico.

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// Contenido de acceso para usuario estandar.

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

// Contenido para usuario administrador.

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

// Contenido para usuario Moderador

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

// Usuarios

exports.getAll = (req, res) => {
    User.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Se produjo un error mientras se procesaba la solicitud."
        });
    });
};

exports.getOne = (req, res) => {
    const id = req.params.id.trim();
    User.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "El registro no existe."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Se produjo un error mientras se procesaba la solicitud."
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    const formData = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.emailAddress
    }

    User.update(formData, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Datos actualizados correctamente."
            });
        } else {
            res.send({
                message: "No se pudo realizar la actualización. Puede que no se haya encontrado el registro."
            });
        }
    })
    .catch(err => {

        var msg = "";

        if(err.errors && err.errors[0].validatorKey == 'not_unique'){
            msg = "El email que intenta ingresar ya existe.";
        }else{
            msg = "Se produjo un error mientras se procesaba la solicitud.";
        }

        res.status(500).send({
            message: msg
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    
    User.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "El registro fue eliminado correctamente."
            });
        } else {
            res.send({
                message: "No se pudo realizar la actualización. Puede que no se haya encontrado el registro."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Se produjo un error mientras se procesaba la solicitud."
        });
    });
};