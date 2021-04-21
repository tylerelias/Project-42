const mongoose = require('mongoose');
const Joi = require("joi");

const Diplomacy = mongoose.model('Diplomacy', new mongoose.Schema({
    owner: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    alliance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alliances'
    }
}));

function validateDiplomacy(input) {
    const schema = Joi.object({
        owner: Joi.string(),
        alliance: Joi.string(),
    });
    return {error, value} = schema.validate(input);
}

exports.Diplomacy = Diplomacy;
exports.validate = validateDiplomacy;
