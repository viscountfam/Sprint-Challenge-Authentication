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
        return request(server)
        .post('/api/auth/register')
        .send({ username: 'Albus', password: 'dumbledore'})
        .expect(201)
        .then( res => {
            expect(res.type).toMatch(/json/)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('password')
        });
    });
});
    
// describe('new login', function() {
//     let token;
//     it('has the ability to login with a recently made account', function() {
//         return request(server)
//         .post('/api/auth/login')
//         .send({ username: 'Albus', password: 'dumbledore'})
//         .expect(200)
//         .then( res => {
//             expect(res.type).toMatch(/json/)
//         });
//     });

//     it('can access jokes with a token', function() {
//         return request(server)
//         .get('/api/jokes')
//         .send(token)
//         .expect(200)
//         .then( response => {
//             expect(response.type).objectContaining(/json/)
//             expect(Array.isArray(response.body)).toBe(true)
//             expect(response.body).toHaveLength(20)
//         })
//     })

// });



// describe('pre-existing login', function() {
//     let token;
//     it('has the ability to login with a pre-made account', function() {
//         return request(server)
//         .post('/api/auth/login')
//         .send({ username: 'Harry', password: 'potter'})
//         .expect(200)
//         .then( res => {
//             expect(res.type).toMatch(/json/)
//         });
//     });

//     it('can access jokes with a token', function() {
//         return request(server)
//         .get('/api/jokes')
//         .send(token)
//         .expect(200)
//         .then( response => {
//             expect(response.type).toMatch(/json/)
//             expect(Array.isArray(response.body)).toBe(true)
//             expect(response.body).toHaveLength(20)
//         })
//     })

// });







