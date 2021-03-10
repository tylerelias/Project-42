const Joi = require("joi");

function input(input) {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required()
    });

    return {error, value} = schema.validate(input);
}

module.exports = { input };