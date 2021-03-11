const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
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
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('Users', userSchema);

function validateUser(input) {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(1)
            .max(32)
            .required(),
        password: Joi
            .string()
            .min(5)
            .max(255)
            .required(),
        email: Joi
            .string()
            .email({
                tlds: {allow: false}
            })
            .min(5)
            .max(255)
            .required(),
        phone: Joi.string()
            .min(5)
            .max(64)
            .required()
    });

    return {error, value} = schema.validate(input);
}

exports.User = User;
exports.validate = validateUser;