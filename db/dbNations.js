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
    social_policies: {
        equality: { type: Number },
        religion: { type: Number }
    } ,
    economic_policies: {
        education: { type: Number },
        healthcare: { type: Number },
        welfare: { type: Number},
        transportation: { type: Number },
        taxation: { type: Number }
    }
}));


async function getNations() {
    return Nations
        .find()
        .sort('name');
}

async function createNation(body) {
    try {
        const nation = new Nations({
            name: body.name,
            population: body.population,
            balance: body.balance,
            social_policies: body.social_policies,
            economic_policies: body.economic_policies
        });

        return await nation.save();
    }
    catch (e) {
        console.error(`createUser(): ${e}`);
    }
}


module.exports = { getNations, createNation }