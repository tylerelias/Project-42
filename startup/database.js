const mongoose = require('mongoose');

const localDb = 'mongodb://localhost/project42'
const address = process.env.DB_ADDRESS || localDb;

module.exports = function () {
    mongoose.connect(address)
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error("Could not connect to MongoDB: ", error));
}