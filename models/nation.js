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
    population: {
        type: Number,
        min: 0,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    social_policies: {
        equality: {
            type: Number,
            min: 0, max: 1
        },
        religion: {
            type: Number,
            min: 0, max: 1
        }
    } ,
    economic_policies: {
        education: {
            type: Number,
            min: 0, max: 1
        },
        healthcare: {
            type: Number,
            min: 0, max: 1
        },
        welfare: {
            type: Number,
            min: 0, max: 1
        },
        transportation: {
            type: Number,
            min: 0, max: 1
        },
        taxation: {
            type: Number,
            min: 0, max: 1
        }
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
        population: Joi
            .number()
            .required()
            .min(0),
        balance: Joi
            .number()
            .required(),
        social_policies: Joi
            .object({
                equality: Joi.number().min(0).max(1),
                religion: Joi.number().min(0).max(1)
            }),
        economic_policies: Joi
            .object({
                education: Joi.number().min(0).max(1),
                healthcare: Joi.number().min(0).max(1),
                welfare: Joi.number().min(0).max(1),
                transportation: Joi.number().min(0).max(1),
                taxation: Joi.number().min(0).max(1)
            }),
        owner: Joi.string()
    });

    return {error, value} = schema.validate(input);
}

exports.Nation = Nation;
exports.validate = validateNation;