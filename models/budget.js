const mongoose = require('mongoose');
const Joi = require("joi");

const Budget = mongoose.model('Budgets', new mongoose.Schema({
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    agriculture: {
        type: Number,
        min: 0, max: 1
    },
    education: {
        type: Number,
        min: 0, max: 1
    },
    energy: {
        type: Number,
        min: 0, max: 1
    },
    transportation: {
        type: Number,
        min: 0, max: 1
    },
    defense: {
        type: Number,
        min: 0, max: 1
    },
    labor: {
        type: Number,
        min: 0, max: 1
    },
    justice: {
        type: Number,
        min: 0, max: 1
    },
    infrastructure: {
        type: Number,
        min: 0, max: 1
    },
    nationalSecurity: {
        type: Number,
        min: 0, max: 1
    },
    housingDevelopment: {
        type: Number,
        min: 0, max: 1
    },
    science: {
        type: Number,
        min: 0, max: 1
    },
    culture: {
        type: Number,
        min: 0, max: 1
    }
}));

function validateBudget(input) {
    const schema = Joi.object({
        owner: Joi.string(),
        agriculture: Joi.number.min(0).max(1),
        education: Joi.number.min(0).max(1),
        energy: Joi.number.min(0).max(1),
        transportation: Joi.number.min(0).max(1),
        defense: Joi.number.min(0).max(1),
        labor: Joi.number.min(0).max(1),
        justice: Joi.number.min(0).max(1),
        infrastructure: Joi.number.min(0).max(1),
        nationalSecurity: Joi.number.min(0).max(1),
        housingDevelopment: Joi.number.min(0).max(1),
        science: Joi.number.min(0).max(1),
        culture: Joi.number.min(0).max(1)
    });
    return {error, value} = schema.validate(input);
}

exports.Budget = Budget;
exports.validate = validateBudget;