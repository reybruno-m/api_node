module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    const path = "/api";

    app.get( path + "/", (req, res) => {
        res.json({ message: "API CRM Running." });
    });
};