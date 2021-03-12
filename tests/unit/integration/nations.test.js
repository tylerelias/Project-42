const request = require('supertest');
const mongoose = require('mongoose');
const {Nation} = require('../../../models/nation')
const {User} = require('../../../models/user')

let server;
const genericNations = [{
    name: "GenericName1",
    population: 1,
    balance: 1,
    social_policies: {equality: 0.5, religion: 0.5},
    economic_policies: {
        education: 0.5,
        healthcare: 0.5,
        welfare: 0.5,
        transportation: 0.5,
        taxation: 0.5
    },
    owner: new mongoose.Types.ObjectId()
},
    {
        name: "GenericName2",
        population: 2,
        balance: 2,
        social_policies: {equality: 0.2, religion: 0.2},
        economic_policies: {
            education: 0.2,
            healthcare: 0.2,
            welfare: 0.2,
            transportation: 0.2,
            taxation: 0.2
        },
        owner: new mongoose.Types.ObjectId()
    }]

describe('/api/nations', () => {
    beforeEach(() => {
        server = require('../../../app');
    })
    afterEach(async () => {
        server.close();
        await Nation.remove({});
    })

    describe('GET /', () => {
        it('should return all nations', async () => {
            await Nation.collection.insertMany(genericNations);

            const res = await request(server).get('/api/nations');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(n => n.name === 'GenericName1')).toBeTruthy();
            expect(res.body.some(n => n.name === 'GenericName2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a single nation if id is valid', async () => {
            const nation = new Nation(genericNations[0]);
            await nation.save();

            const res = await request(server).get('/api/nations/' + nation._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', nation.name);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/nations/1');

            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        it('should return a 401 if client is not logged in', async () => {
            const res = await request(server)
                .post('/api/nations/')
                .send(genericNations[0]);

            expect(res.status).toBe(401);
        });

        it('should return 400 if nation name is a number', async () => {
            const token = new User().generateAuthToken();

            const res = await request(server)
                .post('/api/nations/')
                .set('x-auth-token', token)
                .send({name: 1});

            expect(res.status).toBe(400);
        });

        it('should return 400 if nation name is longer than 32 chars', async () => {
            const token = new User().generateAuthToken();
            const name = new Array(34).join('t');

            const res = await request(server)
                .post('/api/nations/')
                .set('x-auth-token', token)
                .send({name: name});

            expect(res.status).toBe(400);
        });
    });
});