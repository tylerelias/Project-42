// packages
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const connect = require('./db/connect');
// routes
const home = require('./routes/home');
const users = require('./routes/users');
const nations = require('./routes/nations');
const auth = require('./routes/auth');
// app
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(helmet());

connect.connectDb();

app.use('/', home);
app.use('/api/users', users);
app.use('/api/nations', nations);
app.use('/api/auth', auth);

if (app.get('env') === 'development') {
    console.log('Logging enabled');
    // Log api calls
    app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
