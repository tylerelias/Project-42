const mongoose = require('mongoose');
const Joi = require("joi");

const Military = mongoose.model('Military', new mongoose.Schema({
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    infantry: {
        type: Number,
        min: 0
    },
    specialForces: {
        type: Number,
        min: 0
    },
}));

function validateMilitary(input) {
    const schema = Joi.object({
        owner: Joi.string(),
        infantry: Joi.number().min(0),
        specialForces: Joi.number.min(0)
    });
    return {error, value} = schema.validate(input);
}

exports.Military = Military;
exports.validate = validateMilitary;
