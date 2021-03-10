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
    if (!nation) return res.status(400)
        .send('Invalid request'); // happens if someone sends an invalid API call

    res.send(nation);
});

router.put('/:id', async (req, res) => {
    const { error } = validateNation.input(req.body);
    if (error) return res.status(400);

    const nation = await dbNation.editNation(
        req.params.id,
        {
            name: req.body.name,
            population: req.body.population,
            balance: req.body.balance,
            social_policies: {
                equality: req.body.social_policies.equality,
                religion: req.body.social_policies.religion
            },
            economic_policies: {
                education: req.body.economic_policies.education,
                healthcare: req.body.economic_policies.healthcare,
                welfare: req.body.economic_policies.welfare,
                transportation: req.body.economic_policies.transportation,
                taxation: req.body.economic_policies.taxation
            }
        });

    if(!nation) return res.status(404).send('Nation not found');

    res.send(nation);
});

router.get('/:id', async (req, res, next) => {

});

router.delete('/:id', async (req, res, next) => {

});

module.exports = router;