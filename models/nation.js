const mongoose = require('mongoose');
const Joi = require("joi");

const Nation = mongoose.model('Nations', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 32
    },
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}));

function validateNation(input) {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(1)
            .max(32)
            .required(),
        owner: Joi.string()
    });

    return {error, value} = schema.validate(input);
}

exports.Nation = Nation;
exports.validate = validateNation;