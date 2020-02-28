const request = require('supertest');
const db = require('../database/dbConfig.js')
const auth = require('../auth/auth-model.js')
const server = require('../api/server.js');

describe('GET/ without a token', () => {
    it('should give you a 401 error', () => {
        return request(server).get('/api/jokes')
        .expect(401)
        .then( res => {
            expect(res.body).toStrictEqual({"you": 'shall not pass!'})
        })
    })
})

describe('testing the add function on the database', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('add function', () => {
        it('add new users into the db', async () => {
            let userNumber;
            userNumber = await db('users')
            expect(userNumber).toHaveLength(0)
            await auth.add({ username: 'Harry', password: 'potter'})
            await auth.add({ username: 'Ron', password: 'weasley'})
            await auth.add({ username: 'Hermoine', password: 'granger'})
            userNumber = await db('users');
            expect(userNumber).toHaveLength(3)
        });
    });
});

describe('register', function() {
    it('has the ability to register a new user', function() {
        request(server)
        .post('/api/auth/register')
        .send({ username: 'Albus', password: 'dumbledore'})
        .expect(201)
        .then( res => {
            expect(res.type).toMatch(/json/)
            expect(res.body).toHaveProperty('password')
            expect(res.body).objectContaining("Albus")
        });
    });
});
    



describe('login', function() {
    it('has the ability to login with a premade account', function() {
        request(server)
        .post('/api/auth/login')
        .send({ username: 'Harry', password: 'potter'})
        .expect(200)
        .then( res => {
            expect(res.type).toMatch(/json/)
            expect(res.body).objectContaining("Welcome Harry!")
        });
    });


});



