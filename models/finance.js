const mongoose = require('mongoose');
const Joi = require("joi");

const Finance = mongoose.model('Finances', new mongoose.Schema({
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    balance: {
        type: Number
    },
    incomeTax: {
        type: Number,
        min: 0, max: 1
    },
    corporateTax: {
        type: Number,
        min: 0, max: 1
    },
    inflation: {
        type: Number,
        min: 0
    },
    keyInterestRate: {
        type: Number,
        min: 0, max: 1
    },
    gdp: {
        type: Number,
        min: 0
    },
    unemployment: {
        type: Number,
        min: 0, max: 1
    }
}));

function validateFinance(input) {
    const schema = Joi.object({
        owner: Joi.string(),
        incomeTax: Joi.number().min(0).max(1),
        corporateTax: Joi.number().min(0).max(1),
        inflation: Joi.number().min(0).max(1),
        keyInterestRate: Joi.number().min(0).max(1),
        gdp: Joi.number().min(0).max(1),
        unemployment: Joi.number().min(0).max(1)
    });
    return {error, value} = schema.validate(input);
}

exports.Finance = Finance;
exports.validate = validateFinance;
