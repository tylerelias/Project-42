const jwt = require('jsonwebtoken');
const config = require('config');

// user is authenticated by checking their JWT token
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (e) {
        console.log(`auth: ${e}`);
        res.status(401).send('Invalid token');
    }
}