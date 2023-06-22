import request from 'supertest'
import { Ticket } from '../../models/tickets'
import { app } from '../../app'
import { Order } from '../../models/order'
import { OrderStatus } from '@eterosoft/common'
import mongoose from 'mongoose'

it("Marks an order as cancelled",async()=>{
    const ticket = Ticket.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        title:"Concert",
        price:20
    })

    await ticket.save()

    const user = global.signin()

    const {body:order} = await request(app)
    .post("/")
    .set("Cookie", user)
    .send({ticketId:ticket.id})
    .expect(201)


    await request(app)
    .delete(`${order.id}`)
    .set("Cookie",user)
    .send()
    .expect(204)

    const updatedOrder = await Order.findById(order.id)


    expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled)



})

