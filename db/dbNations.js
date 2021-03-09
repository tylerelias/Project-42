const mongoose = require('mongoose');

const Nations = mongoose.model('Nations', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 32
    },
    population: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    social_policies: [ Array ],
    economic_policies: [ Array ]
}));


async function getNations() {
    const nations = Nations
        .find()
        .sort('name');
    return nations;
}


module.exports = { getNations }