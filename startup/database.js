const mongoose = require('mongoose');
const config = require('config');

const address = process.env.DB_ADDRESS || config.get('db');

module.exports = function () {
    mongoose.connect(address)
        .then(() => console.log(`Connected to ${address}`))
        .catch(error => console.error("Could not connect to MongoDB: ", error));
}