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
        console.error(`createNation(): ${e}`);
    }
}

async function editNation(id, body) {
    try {
        const data = new Nations({
            name: body.name,
            population: body.population,
            balance: body.balance,
            social_policies: {
                equality: body.social_policies.equality,
                religion: body.social_policies.religion
            },
            economic_policies: {
                education: body.economic_policies.education,
                healthcare: body.economic_policies.healthcare,
                welfare: body.economic_policies.welfare,
                transportation: body.economic_policies.transportation,
                taxation: body.economic_policies.taxation
            }
        });

        await data.validate();
        return await Nations.findByIdAndUpdate(id, data, {new: true});
    }
    catch (e) {
        console.error(`editNation(): ${e}`);
    }
}

async function deleteNation(id) {
    try {
        return await Nations.findByIdAndRemove(id);
    } catch (e) {
        console.error(`deleteNation(): ${e}`);
    }
}

async function getNation(id) {
    try {
        return await Nations.findById(id);
    } catch (e) {
        console.error(`getNation(): ${e}`)
    }
}


module.exports = {
    getNations,
    createNation,
    editNation,
    deleteNation,
    getNation
}