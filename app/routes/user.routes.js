const { authJwt } = require("../middleware");
const ctrl = require("../controllers/user.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    const path = "/api/users";

    // Contenido.
    app.get( path + "/public", ctrl.allAccess);
    app.get( path + "/user",[authJwt.verifyToken], ctrl.userBoard);
    app.get( path + "/mod",[authJwt.verifyToken, authJwt.isModerator],ctrl.moderatorBoard);
    app.get( path + "/admin",[authJwt.verifyToken, authJwt.isAdmin],ctrl.adminBoard);

    // Usuarios
    app.get( path,[authJwt.verifyToken], ctrl.getAll);
    app.get( path + "/:id",[authJwt.verifyToken], ctrl.getOne);
    app.put( path + "/:id",[authJwt.verifyToken], ctrl.update);
    app.delete( path + "/:id",[authJwt.verifyToken], ctrl.delete);
};