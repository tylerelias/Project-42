const {Nation} = require('../models/nation');
const {Budget} = require('../models/budget');
const {Diplomacy} = require('../models/diplomacy');
const {Finance} = require('../models/finance');
const {Military} = require('../models/military');
const {Politics} = require('../models/politics');
const {Population} = require('../models/population');
const {Social} = require('../models/social');
const {getUser} = require('./users');

async function getNations() {
    return Nation
        .find()
        .populate('owner', 'name -_id')
        .sort('name');
}

async function createNation(body) {
    try {
        const userExists = await getUser(body.owner)

        if (userExists) {
            const nation = new Nation({
                name: body.name,
                owner: body.owner
            });
            const answer = await nation.save();
            const id = answer._doc._id;
            const budget = new Budget({owner: id});
            await budget.save();
            const diplomacy = new Diplomacy({owner: id});
            await diplomacy.save();
            const finance = new Finance({owner: id});
            await finance.save();
            const military = new Military({owner: id});
            await military.save();
            const politics = new Politics({owner: id});
            await politics.save();
            const population = new Population({owner: id});
            await population.save();
            const social = new Social({owner: id});
            await social.save();
            await editNation(id, {
                budget,
                diplomacy,
                finance,
                military,
                politics,
                population,
                social
            });
            return answer;
        }
    } catch (e) {
        console.log(`createNation(): ${e}`);
    }
}

async function editNation(id, body) {
    try {
        const nation = await getNation(id)
        const ownerId = nation.owner._id

        const data = {
            name: body.name,
            owner: ownerId
        };

        return await Nation.findByIdAndUpdate(id, data, {new: true});
    } catch (e) {
        console.log(`editNation(): ${e}`);
    }
}

async function deleteNation(id) {
    try {
        return await Nation.findByIdAndRemove(id);
    } catch (e) {
        console.log(`deleteNation(): ${e}`);
    }
}

async function getNation(id) {
    try {
        return await Nation
            .findById(id)
            .populate('owner', 'name _id');
    } catch (e) {
        console.log(`getNation(): ${e}`);
    }
}

exports.createNation = createNation;
exports.deleteNation = deleteNation;
exports.editNation = editNation;
exports.getNations = getNations;
exports.getNation = getNation;