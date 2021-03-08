// packages
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(express.json());
app.use(helmet());

if (app.get('env') === 'development') {
    console.log('Logging enabled');
    // Log api calls
    app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
