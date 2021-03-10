const mongoose = require('mongoose');

const localDb = 'mongodb://localhost/project42'
const address = process.env.DB_ADDRESS || localDb;

function connectDb() {
    mongoose.connect(address)
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error("Could not connect to MongoDB: ", error));
}

module.exports = {connectDb};