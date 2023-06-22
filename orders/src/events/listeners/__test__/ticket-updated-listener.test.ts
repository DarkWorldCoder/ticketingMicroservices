import mongoose from "mongoose"
import { Ticket } from "../../../models/tickets"
import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedListener } from "../ticket-updated-listeners"
import { TicketUpdatedEvent } from "@eterosoft/common"
import { Message } from "node-nats-streaming"

const setup = async()=>{
    const listener = new TicketUpdatedListener(natsWrapper.client)
    const ticket = Ticket.build({
        id:new mongoose.Types.ObjectId().toHexString(),
        title:"Concert",
        price:20
    })

    await ticket.save()

    const data: TicketUpdatedEvent["data"]={
        id:ticket.id,
        version:ticket.version +1,
        title:"NEw concert",
        price:999,
        userId:"adadfas"
    }
    // @ts-ignore
    const msg:Message = {
        ack:jest.fn()
    }
    return {msg,data,ticket,listener}
}

it("Finds, updates and saves a ticket",async()=>{

    const {msg,data,ticket,listener} = await setup();

    await listener.onMessage(data,msg)
    const updatedTicket = await Ticket.findById(ticket.id )
    expect(updatedTicket!.title).toEqual(data.title)
    expect(updatedTicket!.price).toEqual(data.price)
    expect(updatedTicket!.version).toEqual(data.version)
})