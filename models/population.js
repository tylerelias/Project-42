const mongoose = require('mongoose');
const Joi = require("joi");

const Population = mongoose.model('Population', new mongoose.Schema({
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    population: {
        type: Number,
        min: 0
    },
    birthRate: {
        type: Number,
        min: 0
    },
    mortalityRate: {
        type: Number,
        min: 0
    }
}));

function validatePopulation(input) {
    const schema = Joi.object({
        owner: Joi.string(),
        population: Joi.number().min(0),
        birthRate: Joi.number().min(0),
        mortalityRate: Joi.number().min(0),
    });
    return {error, value} = schema.validate(input);
}

exports.Population = Population;
exports.validate = validatePopulation;
