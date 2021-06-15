const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPassword } = require('../helpers/bcrypt')

//id_product
let idProduct = null

//access_token
let access_token = ''
let access_token_customer = ''

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

//Product Data
const productData = {
    name: 'iphone12',
    image_url: 'https://drive.google.com/file/d/1nxqr-de8nqmGIWxM1_EPWo59XiezfSKs/view?usp=sharing',
    CategoryId: 1,
    price: 15000000,
    stock: 5
}

//Updated Product Data
const updatedProductData = {
    name: 'iphone11',
    image_url: 'https://drive.google.com/file/d/1_x9a-3WeOgpX5rrlhLWJtuFbLNkd_758/view?usp=sharing',
    CategoryId: 1,
    price: 12000000,
    stock: 10
}

//No Input Product Data
const wrongProductData = {
    name: '',
    image_url: '',
    price: '',
    stock: ''
}

//Input Stock Negative Number
const wrongProductData1 = {
    name: 'iphone12',
    image_url: 'https://drive.google.com/file/d/1nxqr-de8nqmGIWxM1_EPWo59XiezfSKs/view?usp=sharing',
    price: 15000000,
    stock: -1
}

//Input Price Negative Number
const wrongProductData2 = {
    name: 'iphone12',
    image_url: 'https://drive.google.com/file/d/1nxqr-de8nqmGIWxM1_EPWo59XiezfSKs/view?usp=sharing',
    price: -15000000,
    stock: 5
}

const wrongProductData3 = {
    name: 'iphone12',
    image_url: 'https://drive.google.com/file/d/1nxqr-de8nqmGIWxM1_EPWo59XiezfSKs/view?usp=sharing',
    price: 15000000,
    stock: 'satu'
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

beforeAll((done) => {
    return queryInterface.bulkInsert('Categories', [{
        name: 'shoes'
    },{
        name: 'accessories'
    },{
        name: 'apparel'
    },{
        name: 'equipment'
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

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(error => {
        done(error)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Categories')
    .then(() => {
        done()
    })
    .catch(error => {
        done(error)
    })
})


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
                access_token = response.body.access_token
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
                access_token_customer = response.body.access_token
                done()
            })
            .catch(err => done(err))
    })
})


// test create product
describe('create product succes case', () => {
    it('return json with id, name, image_url, CategoryID, price & stock', (done) => {
        return request(app)
            .post('/products')
            .send(productData)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(201)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', productData.name)
                expect(body).toHaveProperty('image_url', productData.image_url)
                expect(body).toHaveProperty('CategoryId', productData.CategoryId)
                expect(body).toHaveProperty('price', productData.price)
                expect(body).toHaveProperty('stock', productData.stock)
                idProduct = response.body.id
                done()
            })
            .catch(err => done(err))
    })
})

// test create product error case
describe('create product error case', () => {
    it('return error message access_token not admin', (done) => {
        return request(app)
            .post('/products')
            .send(productData)
            .set('Accept', 'application/json')
            .set('access_token', access_token_customer)
            .expect(401)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'unauthorized')
                done()
            })
            .catch(err => done(err))
    })

    it('return error message required access_token', (done) => {
        return request(app)
            .post('/products')
            .send(productData)
            .set('Accept', 'application/json')
            .expect(401)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'required access_token')
                done()
            })
            .catch(err => done(err))
    })

    it('return error message required fields', (done) => {
        return request(app)
            .post('/products')
            .send(wrongProductData)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'product name must be required',
                    'image_url must be required', 
                    'price must be required', 
                    'stock must be required',
                    'stock must be format number'
                ])
                done()
            })
            .catch(err => done(err))
    })

    it('return error message stock negative number', (done) => {
        return request(app)
            .post('/products')
            .send(wrongProductData1)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ["stock can't be negative numbers"])
                done()
            })
            .catch(err => done(err))
    })

    it('return error message price negative number', (done) => {
        return request(app)
            .post('/products')
            .send(wrongProductData2)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ["price can't be negative numbers"])
                done()
            })
            .catch(err => done(err))
    })

    it('return error message type data not equal', (done) => {
        return request(app)
            .post('/products')
            .send(wrongProductData3)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['stock must be format number'])
                done()
            })
            .catch(err => done(err))
    })
})



//updated data product
describe('updated product succes case', () => {
    it('return json with id, name, image_url, category, price & stock', (done) => {
        return request(app)
            .put(`/products/${idProduct}`)
            .send(updatedProductData)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(200)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body[0]).toHaveProperty('id', idProduct)
                expect(body[0]).toHaveProperty('name', updatedProductData.name)
                expect(body[0]).toHaveProperty('image_url', updatedProductData.image_url)
                expect(body[0]).toHaveProperty('CategoryId', updatedProductData.CategoryId)
                expect(body[0]).toHaveProperty('price', updatedProductData.price)
                expect(body[0]).toHaveProperty('stock', updatedProductData.stock)
                done()
            })
            .catch(err => done(err))
    })
})

//updated data product error case
describe('updated product error case', () => {
    it('return error message required access_token', (done) => {
        return request(app)
            .put(`/products/${idProduct}`)
            .send(updatedProductData)
            .set('Accept', 'application/json')
            .expect(401)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'required access_token')
                done()
            })
            .catch(err => done(err))
    })

    it('return error message access_token not admin', (done) => {
        return request(app)
            .put(`/products/${idProduct}`)
            .send(updatedProductData)
            .set('Accept', 'application/json')
            .set('access_token', access_token_customer)
            .expect(401)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'unauthorized')
                done()
            })
            .catch(err => done(err))
    })

    it('return error message required fields', (done) => {
        return request(app)
            .put(`/products/${idProduct}`)
            .send(wrongProductData)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'product name must be required', 
                    'image_url must be required', 
                    'price must be required', 
                    'stock must be required',
                    'stock must be format number'
                ])
                done()
            })
            .catch(err => done(err))
    })

    it('return error message stock negative number', (done) => {
        return request(app)
            .put(`/products/${idProduct}`)
            .send(wrongProductData1)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ["stock can't be negative numbers"])
                done()
            })
            .catch(err => done(err))
    })

    it('return error message stock negative number', (done) => {
        return request(app)
            .put(`/products/${idProduct}`)
            .send(wrongProductData2)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ["price can't be negative numbers"])
                done()
            })
            .catch(err => done(err))
    })

    it('return error message type data not equal', (done) => {
        return request(app)
            .put(`/products/${idProduct}`)
            .send(wrongProductData3)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(400)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['stock must be format number'])
                done()
            })
            .catch(err => done(err))
    })
})

//delete data product
describe('deleted product succes case', () => {
    it('return message success delete product', (done) => {
        return request(app)
            .delete(`/products/${idProduct}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(200)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'product success deleted')
                done()
            })
            .catch(err => done(err))
    })
})

//delete data product error case
describe('deleted product error case', () => {
    it('return error message access_token not admin', (done) => {
        return request(app)
            .delete(`/products/${idProduct}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token_customer)
            .expect(401)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'unauthorized')
                done()
            })
            .catch(err => done(err))
    })

    it('return error message required access_token', (done) => {
        return request(app)
            .delete(`/products/${idProduct}`)
            .set('Accept', 'application/json')
            .expect(401)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'required access_token')
                done()
            })
            .catch(err => done(err))
    })
})

