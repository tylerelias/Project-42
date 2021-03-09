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

async function getUsers() {
    return Users
        .find()
        .sort('name');
}

async function createUser(body) {
    try {
        const user = new Users({
            name: body.name,
            password: body.password,
            email: body.email,
            phone: body.phone
        });

        return await user.save();
    }
    catch(e) {
        console.error(`createUser(): ${e}`);
    }
}

async function editUser(id, data) {
    return await Users.findByIdAndUpdate(id, data, {new: true});
}

async function deleteUser(id) {
    return Users.findByIdAndRemove(id);
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