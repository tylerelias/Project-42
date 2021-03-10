const express = require('express');
const router = express.Router();
const dbNation = require('../db/dbNations');

const validateNation = require('../validation/validateNation');


router.get('/', async (req, res) => {
    res.send(await dbNation.getNations())
});

router.post('/', async (req, res) => {
    const { error } = validateNation.input(req.body)
    if (error) return res.status(400)
        .send(error.details[0].message);

    const nation = await dbNation.createNation(req.body);
    res.send(nation);
});

router.put('/:id', async (req, res) => {

});

router.get('/:id', async (req, res, next) => {

});

router.delete('/:id', async (req, res, next) => {

});

module.exports = router;