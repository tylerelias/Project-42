const express = require('express');
const router = express.Router();
const dbUser = require('../db/dbUser');

const validateUser = require('../validation/validateUser');

router.get('/', async (req, res) => {
    res.send(await dbUser.getUsers())
});

router.post('/', async (req, res) => {
    const { error } = validateUser.input(req.body)
    if(error) return res.status(400)
        .send(error.details[0].message);

    const user = await dbUser.createUser(req.body);
    res.send(user);
});

router.put('/:id', async (req, res) => {
    const { error } = validateUser.input(req.body);
    if(error) return res.status(400)
        .send(error.details[0].message);

    const user = await dbUser.editUser(
        req.params.id,
        {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
    });

    if(!user) return res.status(404).send('User not found');

    res.send(user);
});

router.delete('/:id', async (req, res) => {

});

router.get('/:id', async (req, res) => {

});

module.exports = router;