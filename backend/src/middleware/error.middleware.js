const winston = require('../utils/logger.utils');

function errorMiddleware(error, req, res, next) {
    // Extract properties from the error object
    let { status = 500, message, data } = error;

    // Logging improve with winston
    winston.error(`[Error] Status: ${status}, Message: ${message}, Data: ${JSON.stringify(data) || 'N/A'}`);

    // Handling of unknown errors
    status = Number.isInteger(status) ? status : 500;
    message = message || 'Internal server error';

     // Consistent structure of the error object
    const errorResponse = {
        type: 'error',
        status,
        message,
        data: data || null
    };

      // Send the response with the structure of the error object
    res.status(status).send({ response: false, error: errorResponse });
}

module.exports = errorMiddleware;
