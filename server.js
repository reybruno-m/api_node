const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

require('dotenv').config();

const { appLogger } = require('./app/utils/logger');

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const corsOptions = require("./app/config/cors")
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// Agrega automaticvamente el Header Set-Cookie a la respuesta.
// Crea una cookie de session que actua como middleware.
app.use(
  cookieSession({
    name: "crm-session",
    secret: process.env.JWT_SECRET,
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000 // 1 Hour.
  })
);

// Modelos DB.
const db = require("./app/models");

// SINCRONIZAR CAMBIOS EN DB.
db.sequelize.sync().then(() => { appLogger.info(" Sincronizando DB..."); });

// ARCHIVOS ESTATICOS FRONTEND
// Acá podes meter en la ruta path, el build de react cosa de tener todo junto.
// Las rutas que estén declaradas en el frontend te van a redireccioanr al front y lo demás
// Va a ir todo por api
//const path = __dirname + '/app/views/';
//app.use(express.static(path));

// ELIMINAR Y RECARGAR DATOS EN LA DB.
// db.sequelize.sync({ force: true }).then(() => { appLogger.info("Drop and re-sync db."); });

// RUTAS DE APLICACIÓN

require("./app/routes/auth.routes")(app);
require("./app/routes/log.routes")(app);
require("./app/routes/test.routes")(app);
require("./app/routes/user.routes")(app);

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// Puerto de escucha para solicitudes.
const PORT = process.env.API_PORT || 8080;

app.listen(PORT, () => {
  appLogger.info(`Server is running on port ${PORT}.`);
});
