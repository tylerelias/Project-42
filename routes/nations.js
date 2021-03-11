const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');
const {getNation, editNation, createNation, deleteNation, getNations} = require('../db/nations');
const {validate} = require('../models/nation');


router.get('/', async (req, res) => {
    res.send(await getNations())
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body)
    if (error) {
        console.error(`POST - /nation/ - ${error.message}`)
        return res.status(400).send('Invalid request');
    }

    const nation = await createNation(req.body);
    if (!nation) return res.status(400)
        .send('Invalid request');

    res.send(nation);
});

router.put('/:id', owner, async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        console.error(`PUT - /nation/:id - ${error.message}`)
        return res.status(400).send('Invalid request');
    }

    const nation = await editNation(req.params.id, req.body);
    if (!nation) return res.status(400).send('Invalid request');

    res.send(nation);
});

router.delete('/:id', owner, async (req, res) => {
    const nation = await deleteNation(req.params.id);
    if (!nation) return res.status(400).send('Invalid request');
    res.send(nation);
});

router.get('/:id', async (req, res) => {
    const user = await getNation(req.params.id);

    if (!user) return res.status(404).send('Invalid request');
    res.send(user);
});

module.exports = router;