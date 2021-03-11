const _ = require('lodash');
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

    const user = await createUser(
        _.pick(req.body, ['name', 'password', 'email', 'phone']
        ));

    res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400)
        .send(error.details[0].message);

    const user = await editUser(
        req.params.id,
        _.pick(req.body, ['name', 'password', 'email', 'phone'])
    );

    if (!user) return res.status(404).send('User not found');

    res.send(_.pick(user, ['_id', 'name', 'email']));
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