const Joi = require("joi");

function input(input) {
    const schema = Joi.object({
        name: Joi.string().required(),
        population: Joi.number().required(),
        balance: Joi.number().required(),
        social_policies: Joi.array(),
        economic_policies: Joi.array
    });

    return {error, value} = schema.validate(input);
}

module.exports = { input };