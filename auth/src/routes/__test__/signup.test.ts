import request from 'supertest'
import {app} from '../../app'

it('returns a 201 on successful signup',async()=>{
    return request(app)
    .post('/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)
})

it('return a 400 with a invalid email',async()=>{
    return request(app)
    .post('/signup')
    .send({
        email:'adfdkfjdsa',
        password:'adfafa'
    })
    .expect(400)
})

it('return a 400 with a invalid password',async()=>{
    return request(app)
    .post('/signup')
    .send({
        email:'adfdkfjdsa@gmail.com',
        password:'a'
    })
    .expect(400)
})

it('return a 400 with a missing email and password',async()=>{
    return request(app)
    .post('/signup')
    .send({
      
    })
    .expect(400)
})

it('disallows same emails',async()=>{
    await request(app)
    .post('/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)

    await request(app)
    .post('/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(400)
})


it('set a cookie after successful signup',async()=>{
    const response = await request(app)
    .post('/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
})