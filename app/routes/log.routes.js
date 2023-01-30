const { authJwt } = require("../middleware");
const ctrl = require("../controllers/logg.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    const path = "/api/logs";

    app.get( path, [authJwt.verifyToken], ctrl.get);
};
