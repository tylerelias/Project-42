const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index', { title: "Project 42", message: 'Hello'})
});

module.exports = router;