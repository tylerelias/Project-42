const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const owner = require('../middleware/nationOwner');
const {getNation, editNation, createNation, deleteNation, getNations} = require('../db/nations');
const {validate} = require('../models/nation');
const validateObjectId = require('../middleware/validateObjectId');


router.get('/', async (req, res) => {
    res.send(await getNations())
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body)
    if (error) {
        console.log(`POST - /nation/ - ${error.message}`)
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
        console.log(`PUT - /nation/:id - ${error.message}`)
        return res.status(400).send('Invalid request');
    }

    const nation = await editNation(req.params.id, req.body);
    if (!nation) return res.status(400).send('Invalid request');

    res.send(nation);
});

router.delete('/:id', validateObjectId, owner, async (req, res) => {
    const nation = await deleteNation(req.params.id);
    if (!nation) return res.status(400).send('Invalid request');
    res.send(nation);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const user = await getNation(req.params.id);

    if (!user) return res.status(404).send('Invalid request');
    res.send(user);
});

module.exports = router;