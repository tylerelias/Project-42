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
        min: 0,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    social_policies: {
        equality: {
            type: Number,
            min: 0, max: 1
        },
        religion: {
            type: Number,
            min: 0, max: 1
        }
    } ,
    economic_policies: {
        education: {
            type: Number,
            min: 0, max: 1
        },
        healthcare: {
            type: Number,
            min: 0, max: 1
        },
        welfare: {
            type: Number,
            min: 0, max: 1
        },
        transportation: {
            type: Number,
            min: 0, max: 1
        },
        taxation: {
            type: Number,
            min: 0, max: 1
        }
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

async function editNation(id, data) {
    return await Nations.findByIdAndUpdate(id, data, {new: true});
}


module.exports = { getNations, createNation, editNation }