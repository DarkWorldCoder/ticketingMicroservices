import { Message } from "node-nats-streaming";

import { Subjects,Listener,TicketCreatedEvent } from "@eterosoft/common";
import {Ticket} from "../../models/tickets"
import { queueGroupName } from "./queue-groupname";


export class TicketCreatedListener extends Listener<TicketCreatedEvent>{


        subject:Subjects.TicketCreated = Subjects.TicketCreated
        queueGroupName=queueGroupName
        async onMessage(data: TicketCreatedEvent['data'], msg: Message){
        const {id,title,price}= data;
        const ticket = Ticket.build({
            title,
            price,
            id

        })

        await ticket.save()

        msg.ack()
        }

}

