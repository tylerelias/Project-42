const bcrypt = require("bcrypt");
const {User} = require('../models/user');

async function getUsers() {
    return User
        .find()
        .select('-password -email -phone -isAdmin')
        .sort('name');
}

async function createUser(data) {
    try {
        const user = new User(data);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        return await user.save();
    } catch (e) {
        console.error(`createUser(): ${e}`);
    }
}

async function editUser(id, data) {
    try {
        return await User.findByIdAndUpdate(id, data, {new: true});
    } catch (e) {
        console.error(`editUser(): ${e}`);
    }
}

async function deleteUser(id) {
    try {
        return await User.findByIdAndRemove(id);
    } catch (e) {
        console.error(`deleteUser(): ${e}`);
    }
}


async function getUser(id) {
    try {
        return User.findById(id)
            .select('-password -email -isAdmin');
    } catch (e) {
        console.error(`getUser(): ${e}`);
    }
}

async function authUser(req) {
    return User.findById(req.user._id).select('-password')
}

exports.authUser = authUser;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.getUsers = getUsers;
exports.getUser = getUser;