import { Subjects,Listener,PaymentCreatedEvent, OrderStatus  } from "@eterosoft/common";

import { queueGroupName } from "./queue-groupname";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
    subject:Subjects.PaymentCreated = Subjects.PaymentCreated
    queueGroupName = queueGroupName

    async onMessage(data:PaymentCreatedEvent["data"],msg:Message){
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new Error("order not found")
        }

        order.set({
            status:OrderStatus.Complete,
        })

        await order.save()
        msg.ack()

    }
}