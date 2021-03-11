const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.get('/', async (req, res) => {
    res.send(true)
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400)
        .send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi
            .string()
            .email({
                tlds: {allow: false}
            })
            .min(5)
            .max(255)
            .required(),
        password: Joi
            .string()
            .min(5)
            .max(255)
            .required()
    });

    return {error, value} = schema.validate(req);
}

module.exports = router;