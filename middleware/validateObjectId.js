const mongoose = require('mongoose');

// prevent the insertion of id's that are not valid
module.exports = function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid Request');

    next();
}