const { User } = require('../models/user');

async function getUsers() {
    return User
        .find()
        .sort('name');
}

async function createUser(body) {
    try {
        const user = new User({
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
        return await User.findById(id);
    } catch (e) {
        console.error(`getUser(): ${e}`);
    }
}

exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.getUsers = getUsers;
exports.getUser = getUser;