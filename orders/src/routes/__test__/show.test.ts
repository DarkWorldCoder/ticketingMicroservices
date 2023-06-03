import { app } from "../../app"
import { Ticket } from "../../models/tickets"
import request from 'supertest'
it("fetches the order",async()=>{
    const ticket = Ticket.build({
        title:"concert",
        price:20
    })
    await ticket.save()

    const user = global.signin()

    const {body:order} = await request(app)
    .post('/')
    .set("Cookie",user)
    .send({ticketId:ticket.id})
    .expect(201)


    const {body:fetchedOrder} = await request(app)
    .get(`/${order.id}`)
    .set("Cookie",user)
    .send()
    .expect(200)

    expect(fetchedOrder.id).toEqual(order.id)
 



})