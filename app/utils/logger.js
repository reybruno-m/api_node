const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;

const appLogger = createLogger({
    format: combine( timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json() ),
    levels: config.syslog.levels,
    transports: [
        new transports.File({ filename: 'logs/app.log' })
    ],
});

const requestLogger = createLogger({
    format: combine( timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json() ),
    levels: config.syslog.levels,
    transports: [
        new transports.File({ filename: 'logs/external_request.log' })
    ],
});

module.exports = {
    appLogger: appLogger,
    requestLogger: requestLogger
};