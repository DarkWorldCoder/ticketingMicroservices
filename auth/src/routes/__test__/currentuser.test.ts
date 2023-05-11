import request from 'supertest'
import {app} from "../../app"

it('responds with details about the current user',async()=>{
    const cookie = await signin()
     

    const response = await request(app)
    .get("/currentuser")
    .send()
    .set('Cookie',cookie)
    .expect(200)

    // console.log(response.body)
})

it('response with null if not authorized',async()=>{
    const response = await request(app)
    .get("/currentuser")
    .send()
    .expect(200)
    
    // console.log(response.body)
    expect(response.body.currentUser).toEqual(null)
    
})