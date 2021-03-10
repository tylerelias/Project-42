const express = require('express');
const router = express.Router();
const {getUsers, editUser, createUser, deleteUser, getUser} = require('../db/users');
const {validate} = require('../models/user');

router.get('/', async (req, res) => {
    res.send(await getUsers())
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400)
        .send(error.details[0].message);

    const user = await createUser(req.body);
    res.send(user);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400)
        .send(error.details[0].message);

    const user = await editUser(
        req.params.id,
        {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        });

    if (!user) return res.status(404).send('User not found');

    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await deleteUser(req.params.id);

    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await getUser(req.params.id);

    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

module.exports = router;