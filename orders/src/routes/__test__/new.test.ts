
import request from 'supertest';
import mongoose from 'mongoose';
import {app} from "../../app"
import { Ticket } from '../../models/tickets';
import { Order } from '../../models/order';
import { OrderStatus } from '@eterosoft/common';
it("return an error if the ticket does not exist",async()=>{
    const ticketId = mongoose.Types.ObjectId;

    await request(app).post("/").set('Cookie',global.signin())
    .send({ticketId})
    .expect(404)

 })

 it('returns an error if the ticket is already reseverd',async()=>{

    const ticket = Ticket.build({
        title:'concert',
        price:20

    })

    await ticket.save()

    const order = Order.build({
        ticket,
        userId:"adfadfasf",
        status:OrderStatus.Created,
        expiresAt: new Date()
    }) 
    await order.save()

    await request(app)
    .post("/")
    .set("Cookie",global.signin()) 
    .send({ticketId:ticket.id})
    .expect(400)
 })

 it('reserves a ticket',async()=>{

    const ticket = Ticket.build({
        title:"Concert",
        price:20
    })

    await ticket.save()

    await request(app)
    .post("/")
    .set("Cookie",global.signin())
    .send({ticketId:ticket.id})
    .expect(201)

 })