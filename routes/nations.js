const express = require('express');
const router = express.Router();
const dbNations = require('../db/dbNations');

const validateNation = require('../validation/validateNation');


router.get('/', async (req, res) => {
    res.send(await dbNations.getNations())
});

router.post('/', async (req, res) => {
    const { error } = validateNation.input(req.body)
    if (error) return res.status(400)
        .send(error.details[0].message);

    const nation = await dbNations.createNation(req.body);
    if (!nation) return res.status(400)
        .send('Invalid request'); // happens if someone sends an invalid API call

    res.send(nation);
});

router.put('/:id', async (req, res) => {
    const { error } = validateNation.input(req.body);
    if (error) return res.status(400);

    const nation = await dbNations.editNation(req.params.id, req.body);
    if(!nation) return res.status(400).send('Invalid request');

    res.send(nation);
});

router.delete('/:id', async (req, res, next) => {
    const nation = await dbNations.deleteNation(req.params.id);

    if (!nation) return res.status(400).send('Invalid request');
    res.send(nation);
});

router.get('/:id', async (req, res, next) => {
    const user = await dbNations.getNation(req.params.id);

    if(!user) return res.status(404).send('Invalid request');
    res.send(user);
});

module.exports = router;