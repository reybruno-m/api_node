const { requestLogger } = require('../utils/logger');

// Definir lista blanca para evitar problemas de cors. 

const whitelist = [
    // DEV
    "http://localhost:8080",
    // QA
    // PROD
];
  
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
            requestLogger.info(`Access from: ${origin} OK`);
        } else {
            requestLogger.info(`Origen: ${origin} no permitido por CORS`);
            callback(new Error("ERROR DE CORS"))
        }
    },
    credentials: true,
}

module.exports = corsOptions;
