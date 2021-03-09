const express = require('express');
const router = express.Router();
const dbUser = require('../db/dbUser');

const validateUser = require('../validation/validateUser');

router.get('/', async (req, res) => {
    res.send(await dbUser.getUsers())
});

router.post('/', async (req, res) => {

});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

router.get('/:id', async (req, res) => {

});

module.exports = router;