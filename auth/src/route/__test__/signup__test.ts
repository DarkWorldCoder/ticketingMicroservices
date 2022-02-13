import request from 'supetest'

import {app} from "../../app"

it('return a 201 on successful signup',async()=>{
    return  request(app)
    .post('api/users/signup')
    .send({
        email:"test@test.com",
        password:"passwird"
    })
    .expect(201)
})