const jwt = require('jsonwebtoken');
const config = require('config');
const { Nation } = require('../models/nation');

// verifies that the person trying to access a features
// is indeed the owner of that nation
module.exports = async function owner(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        const nation = await Nation
            .findById(req.params.id)
            .populate('owner', '_id');
        if(decoded._id === nation.owner._id.toString()) {
            next();
        } else {
            return res.status(401).send('Access denied');
        }
    }
    catch (e) {
        console.log(`owner: ${e}`);
        res.status(400).send('Invalid token');
    }
}