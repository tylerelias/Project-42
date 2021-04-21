const express = require('express');
const morgan = require('morgan');
const app = express();

// loading logging model (wip)
require('./startup/logging')();
// calls all the routes that are stored in routes.js
require('./startup/routes')(app);
// connecting to db
require('./startup/database')();
// loading application configurations
require('./startup/config')();
// loading views (wip)
require('./startup/views')(app);

if (app.get('env') === 'development') {
    console.log('Logging enabled');
    // Log api calls
    app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Listening on port ${port}...`))

module.exports = server;