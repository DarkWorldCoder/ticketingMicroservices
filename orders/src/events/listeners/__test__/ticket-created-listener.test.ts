import { TicketCreatedListener } from "../ticket-created-listener"
import { natsWrapper } from "../../../nats-wrapper" 
import { TicketCreatedEvent } from "@eterosoft/common"
import mongoose, { set } from "mongoose"
import { Message } from "node-nats-streaming"
import { Ticket } from "../../../models/tickets"


const setup = async()=>{
    const listener = new TicketCreatedListener(natsWrapper.client)
    const data: TicketCreatedEvent['data'] ={
        version:0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title:"concert",
        userId: new mongoose.Types.ObjectId().toHexString(),
        price:100
    }

    // @ts-ignore
    const msg: Message = {
         ack: jest.fn()
    }

    return{listener,data,msg}
}
it("Creates and saves a ticket",async()=>{

    const {listener,data,msg} = await setup()

    await listener.onMessage(data,msg)

    const ticket = await Ticket.findById(data.id)

    expect(ticket).toBeDefined()
    expect(ticket?.title).toEqual(data.title)
    expect(ticket?.price).toEqual(data.price)

})

it('acks the message',async()=>{

})