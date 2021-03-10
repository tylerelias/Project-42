const mongoose = require('mongoose');
const Joi = require("joi");

const User = mongoose.model('Users', new mongoose.Schema({
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

function validateUser(input) {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email({
            tlds: {allow: false}
        }).required(),
        phone: Joi.string().required()
    });

    return {error, value} = schema.validate(input);
}

exports.User = User;
exports.validate = validateUser;