const mongoose = require('mongoose');
const Joi = require('joi');

const Social = mongoose.model('Social', new mongoose.Schema({
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    literacy: {
        type: Number,
        min: 0, max: 1
    },
    minorities: {
        type: Number,
        min: 0, max: 1
    },
    religion: {
        type: Number,
        min: 0, max: 1
    },
    women: {
        type: Number,
        min: 0, max: 1
    },
    immigration: {
        type: Number,
        min: 0, max: 1
    },
    crimeRate: {
        type: Number,
        min: 0, max: 1
    },
    hdr: { //human development ranking/index
        type: Number,
        min: 0, max: 1
    },
    pressFreedom: {
        type: Number,
        min: 0, max: 1
    }
}));

function validateSocial(input) {
    const schema = Joi.object({
        owner: Joi.string(),
        literacy: Joi.number().min(0).max(1),
        minorities: Joi.number().min(0).max(1),
        religion: Joi.number().min(0).max(1),
        women: Joi.number().min(0).max(1),
        immigration: Joi.number().min(0).max(1),
        crimeRate: Joi.number().min(0).max(1),
        hdr: Joi.number().min(0).max(1),
        pressFreedom: Joi.number().min(0).max(1),
    });
    return {error, value} = schema.validate(input);
}

exports.Social = Social;
exports.validate = validateSocial;
