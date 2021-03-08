// packages
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const connect = require('./db/dbConnect');

const app = express();

app.use(express.json());
app.use(helmet());

connect.connectDb();

if (app.get('env') === 'development') {
    console.log('Logging enabled');
    // Log api calls
    app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
