import {ExpirationCompleteEvent, Listener, OrderStatus, Subjects} from "@eterosoft/common"
import { queueGroupName } from "./queue-groupname"
import { Message } from "node-nats-streaming"
import { Order } from "../../models/order"
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher"

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    queueGroupName = queueGroupName
    subject:Subjects.ExpirationComplete = Subjects.ExpirationComplete

    async onMessage(data:ExpirationCompleteEvent["data"],msg:Message){
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new Error("Order not found")
        }

        order.set({
            status:OrderStatus.Cancelled,
        })

        await order.save();
        new OrderCancelledPublisher(this.client).publish({
            id:order.id,
            version:order.version,
            ticket:{
                id:order.ticket.id
            }
        })

        msg.ack()
    }
}