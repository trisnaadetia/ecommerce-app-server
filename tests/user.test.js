const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/bcrypt')

//Valid Data User Admin
const userData = {
    username: 'admin',
    email: 'admin@mail.com',
    role: 'admin',
    password: '123456'
}

//Valid Data User Customer
const userData1 = {
    username: 'riskaelsa',
    email: 'riskaelsa@gmail.com',
    role: 'customer',
    password: '123456'
}

//Wrong User Data
const wrongUserData = {
    email: 'maulana@gmail.com',
    password: '123456'
}

//Wrong Password
const wrongUserData1 = {
    email: 'admin@mail.com',
    password: '1234567'
}

//No Input User Data
const wrongUserData2 = {
    email: '',
    password: ''
}

// hooks
beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
        username: 'admin',
        email: 'admin@mail.com',
        password: hashPassword('123456'),
        role: 'admin'
    }])
    .then(() => {
        done()
    })
    .catch(error => {
        done(error)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then(() => {
        done()
    })
    .catch(error => {
        done(error)
    })
})


// ---------------------------TEST CASE------------------------------

//test register
describe('register succes case', () => {

    it('return json with id, username, email (customer)', (done) => {
        return request(app)
            .post('/register')
            .send(userData1)
            .set('Accept', 'application/json')
            .expect(201) 
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', userData1.email)
                expect(body).toHaveProperty('role', userData1.role)
                done()
            })
            .catch(err => done(err))
    })
})

// test login success
describe('login success case', () => {
    it('return json with id, username, email & access_token (admin)', (done) => {
        return request(app)
            .post('/loginAdmin')
            .send(userData)
            .set('Accept', 'application/json')
            .expect(200) 
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', userData.email)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
            .catch(err => done(err))
    })

    it('return json with id, username, email & access_token (customer)', (done) => {
        return request(app)
            .post('/login')
            .send(userData1)
            .set('Accept', 'application/json')
            .expect(200) 
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', userData1.email)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
            .catch(err => done(err))
    })
})

// test login errors
describe('login error case', () => {
    it('return error message invalid password or email', (done) => {
        return request(app)
            .post('/loginAdmin')
            .send(wrongUserData)
            .set('Accept', 'application/json')
            .expect(400) 
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'invalid password or email')
                done()
            })
            .catch(err => done(err))
    })

    it('return error message invalid password', (done) => {
        return request(app)
            .post('/loginAdmin')
            .send(wrongUserData1)
            .set('Accept', 'application/json')
            .expect(400) 
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'invalid password')
                done()
            })
            .catch(err => done(err))
    })

    it('return error message email and paswoord must be required', (done) => {
        return request(app)
            .post('/loginAdmin')
            .send(wrongUserData2)
            .set('Accept', 'application/json')
            .expect(400) 
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'email and password must be required')
                done()
            })
            .catch(err => done(err))
    })
})
