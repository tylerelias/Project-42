// const winston = require('winston');

// TODO: Find out why errors dont get saved to errors.log
// this will be replacing console.log errors

module.exports = function(err, req, res, next) {
    // winston.error(err.message);
    console.log(`Error: ${err.message}`)
    res.status(500).send('Server not responding');
}