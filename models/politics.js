const mongoose = require('mongoose');
const Joi = require("joi");

const Politics = mongoose.model('Politics', new mongoose.Schema({
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    affiliation: {
        type: Number,
        min: 0, max: 5
    },

}));

function validatePolitics(input) {
    const schema = Joi.object({
        owner: Joi.string(),
        affiliation: Joi.number().min(0).max(5),
    });
    return {error, value} = schema.validate(input);
}

exports.Politics = Politics;
exports.validate = validatePolitics;
