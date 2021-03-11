const winston = require('winston');
/*
    Logs errors that occur during runtime and saves them
    to a log file. Having problems with writing to log file
 */
const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            timestamp: new Date().toISOString(),
            level: 'info'
        }),
    ]
});

module.exports = {
    errorLog: errorLog
}