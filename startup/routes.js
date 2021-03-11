const express = require('express');
const helmet = require('helmet');
// routes
const home = require('../routes/home');
const users = require('../routes/users');
const nations = require('../routes/nations');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(helmet());
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', users);
    app.use('/api/nations', nations);
    app.use('/api/auth', auth);
    app.use(error);
}