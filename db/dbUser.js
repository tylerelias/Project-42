const mongoose = require('mongoose');

// Users table for MongoDB
const Users = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 128
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 128
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 64
    },
    register_date: {
        type: Date,
        default: Date.now
    }
}));

async function createUser(body) {

}

async function deleteUser(id) {

}

async function editUser(id, data) {

}

async function getUsers() {

}

async function getUser(id) {

}

module.exports = {
    createUser,
    deleteUser,
    editUser,
    getUsers,
    getUser
}