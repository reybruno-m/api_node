const { authJwt } = require("../middleware");
const ctrl = require("../controllers/auth.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
            );
        next();
    });

    const path = "/api/auth";

    app.post( path + "/", ctrl.logInUser);
    app.get( path + "/me", [authJwt.verifyToken], ctrl.checkUser);
    app.get( path + "/logout", ctrl.logoutUser); 
    app.post( path + "/signup", ctrl.signupUser);
    app.put( path + "/password/:id",[authJwt.verifyToken], ctrl.updatePassword);

};