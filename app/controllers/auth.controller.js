const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../models");
const Joi = require('joi');
const { promisify } = require('util');

const User = db.users;

const LoggCtrl = require("../controllers/logg.controller");

// Configurar el token y su validez.

const createUserToken = async(user, roles, code, req, res) => {
    // Caducidad.
    let d = new Date();
    d.setDate(d.getDate() + 1); // 24 Hs
    
    // Generar Token.
    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    // Cookie Settings
    res.cookie('jwt', token, {
        expires: d, 
        httpOnly: true,
        //sameSite: 'none',
        //secure: req.secure || req.headers['x-forwarded-proto'] === 'https', 
    });

    user.password = null

    let authorities = [];
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    res.status(code).json({
        status: 'success',
        message: "Acceso Correcto.",
        token: token,
        user: user,
        roles: authorities,
    });
};

// Iniciar Sesion.

exports.logInUser = async (req, res) => {
    const body = req.body //user, password, device

    const user = await User.findAll({
        where: {
            username: body.username
        }
    });

    if(!user[0]){
        return res.status(422).json({ error: "Los datos ingresados no son validos." });
    }

    const roles = await user[0].getRoles();

    if(!roles){
        return res.status(422).json({error: "No se pudieron recuperar los roles para este usuario."})
    }

    const validPassword = bcrypt.compareSync(body.password, user[0].password);

    if(!validPassword){
        return res.status(422).json({ error: "Usuario y/o Contraseña Incorrectos." });
    }

    const ip  = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const id  = (user) ? user[0].id : '';
    const dev = (body) ? body.device: '';

    LoggCtrl.store(id, ip, dev, "LOGIN");

    // Response.
    createUserToken(user[0], roles, 200, req, res);
};

// Verificar Cookie de Usuario.

exports.checkUser = async(req, res, next) => {
    let currentUser;
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        currentUser = await User.findByPk(decoded.id);

        if(currentUser){
            currentUser.password = null;
        }

      } else {
        currentUser =  null;
      }

      res.status(200).send({ currentUser });
};

// Finalizar Sesion.

exports.logoutUser = async (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true
    });
    res.status(200).send('Sesion finalizada correctamente.');
};

// Registrar Usuario.

exports.signupUser = async (req, res) => {
    const body = req.body
    
    // Validación.
    const schemaRegister = Joi.object({
        name: Joi.string().min(3).required(),
        username: Joi.string().min(5).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
    })

    const { error } = schemaRegister.validate(body)
    
    if (error) {
        return res.status(422).json(
            { error: error.details[0].message }
        )
    }

    // Existe el Nombre de Usuario? 
    const alreadyRegister = await User.findOne( { username: body.username } );

    if(alreadyRegister){
        return res.status(422).json({ error: "El Usuario ya se encuentra registrado." });
    }

    // Nuevo
    const salt = await bcrypt.genSalt(10);
    
    const user = {
        name: body.name,
        email: body.email,
        username: body.username,
        password: await bcrypt.hash(body.password, salt),
        state: body.state ? body.state : true
    };

    // Guardar en DB.
    User.create(user)
    .then(data => {
        res.send(data);
    });
};

// Actualizar Contraseña.

exports.updatePassword = async (req, res) => {
    const id    = req.params.id
    const user  = await User.findByPk(id);

    if(!user){
        return res.status(422).json(
            { error: "Se produjo un error mientras se procesaba la solicitud." }
        )
    }

    // Validación.
    /* const schemaPwd = Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,12}$')),
        repeat_password: Joi.ref('password'),
    })

    const { error } = schemaPwd.validate(req.body)
    
    if (error) {
        return res.status(422).json(
            { error: error.details[0].message }
        )
    } */

    // La clave actual es la correcta.
    const correctPassword = bcrypt.compareSync(req.body.currentPassword, user.password);

    if(!correctPassword){
        return res.status(422).json({
            error: 'La clave actual no es valida.'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const newPwd = await bcrypt.hash(req.body.password, salt);
    
    User.update({ password: newPwd }, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {

            req.session = null;
            
            res.cookie('jwt', 'loggedout', {
                expires: new Date(Date.now() + 1 * 1000),
                httpOnly: true
            });

            return res.status(200).send({
                message: "Clave actualizada correctamente, deberá iniciar sesión nuevamente."
            });

        } else {
            return res.send({
                message: "No se pudo realizar la actualización. Puede que no se haya encontrado el registro."
            });
        }
    })
    .catch(err => {
        return res.status(500).send({
            message: "Se produjo un error mientras se procesaba la solicitud."
        });
    });
};
