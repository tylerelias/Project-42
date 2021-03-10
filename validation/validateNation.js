const Joi = require("joi");

function input(input) {
    const schema = Joi.object({
        name: Joi.string().required(),
        population: Joi.number().required(),
        balance: Joi.number().required(),
        social_policies: Joi.object(),
        economic_policies: Joi.object()
    });

    return {error, value} = schema.validate(input);
}

module.exports = { input };