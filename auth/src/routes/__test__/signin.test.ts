import request from 'supertest'
import {app} from '../../app'


it('fails when a email that does not exists',async()=>{
     await request(app)
     .post('/signin')
     .send({
        email:'test@test.com',
        password:"password"
     })
     .expect(400)
})

it('fails when an incorrect password is supplied',async()=>{
    await request(app)
    .post('/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)

    await request(app)
    .post('/signin')
    .send({
        email:'test@test.com',
        password:"adfasfads"
    })
    .expect(400)

})


it('test to find the cookie after sign in',async()=>{
    await request(app)
    .post('/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)

   const response =  await request(app)
    .post('/signin')
    .send({
        email:'test@test.com',
        password:"password"
    })
    .expect(200)

    expect(response.get("Set-Cookie"))
})