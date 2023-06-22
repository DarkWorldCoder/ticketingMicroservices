import request from 'supertest'
import {app} from "../../app"

import {Order} from "../../models/order"
import { Ticket } from '../../models/tickets'
import mongoose from 'mongoose'


const buildTicket = async()=>{
    const ticket = Ticket.build({
        id:new mongoose.Types.ObjectId().toHexString(),

        title:'Concert',
        price:10
    })

    await ticket.save()
    return ticket
}
it('Fetches orders for an particuler user',async()=>{

     const ticketOne = await buildTicket()
     const ticketTwo = await buildTicket()
     const ticketThree = await buildTicket()

     const userOne = global.signin();
     const userTwo = global.signin()


     await request(app)
     .post("/")
     .set("Cookie", userOne)
     .send({ticketId:ticketOne.id})
     .expect(201)

     const {body:orderOne} = await request(app)
     .post("/")
     .set("Cookie", userTwo)
     .send({ticketId:ticketTwo.id})
     .expect(201)

     const {body:orderTwo} = await request(app)
     .post("/")
     .set("Cookie", userTwo )
     .send({ticketId:ticketThree.id})
     .expect(201)

     const response = await request(app)
     .get("/")
     .set("Cookie",userTwo)
     .expect(200)

     expect(response.body.lenght).toEqual(2)
     expect(response.body[0].id).toEqual(orderOne.id)
     expect(response.body[1].id).toEqual(orderTwo.id)







})