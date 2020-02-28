const request = require('supertest');
const db = require('../database/dbConfig.js')
const auth = require('../auth/auth-model.js')
const server = require('../api/server.js');

describe('GET/ without a token', () => {
    it('should give you a 401 error', () => {
        return request(server).get('/api/jokes')
        .expect(401)
        .expect('Content-Type', JSON)
        .then( res => {
            expect(res.body.err).toBe('shall not pass!')
        })
    })
})

describe('testing the add function on the database', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('add function', () => {
        it('add new users into the db', () => {
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

