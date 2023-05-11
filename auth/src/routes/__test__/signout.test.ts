import request from 'supertest'
import {app} from "../../app"


it('clears the cookie after signing out',async()=>{
    await request(app)
    .post('/signup')
    .send({
        email:"test@test.com",
        password:'password'
    })
    .expect(201)

    const response = await request(app)
    .post('/signout')
    .send({})
    .expect(200)

    console.log(response.get('Set-Cookie'))
})