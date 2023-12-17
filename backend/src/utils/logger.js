const winston = require('winston');

// Configuración básica del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
  format: winston.format.simple()
});

module.exports = logger;
