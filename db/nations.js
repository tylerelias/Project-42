const { Nation } = require('../models/nation');
const { getUser } = require('./users');

async function getNations() {
    return Nation
        .find()
        .populate('owner', 'name')
        .sort('name');
}

async function createNation(body) {
    try {
        const userExists = await getUser(body.owner)

        if (userExists) {
            const nation = new Nation({
                name: body.name,
                population: body.population,
                balance: body.balance,
                social_policies: body.social_policies,
                economic_policies: body.economic_policies,
                owner: body.owner
            });
            return await nation.save();
        }
    }
    catch (e) {
        console.error(`createNation(): ${e}`);
    }
}

async function editNation(id, body) {
    try {
        const nation = await getNation(id)
        const ownerId = nation.owner

        const data = {
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
            },
            owner: ownerId
        };

        return await Nation.findByIdAndUpdate(id, data, {new: true});
    }
    catch (e) {
        console.error(`editNation(): ${e}`);
    }
}

async function deleteNation(id) {
    try {
        return await Nation.findByIdAndRemove(id);
    } catch (e) {
        console.error(`deleteNation(): ${e}`);
    }
}

async function getNation(id) {
    try {
        return await Nation
            .findById(id)
            .populate('owner', 'name');
    } catch (e) {
        console.error(`getNation(): ${e}`);
    }
}


exports.createNation = createNation;
exports.deleteNation = deleteNation;
exports.editNation = editNation;
exports.getNations = getNations;
exports.getNation = getNation;