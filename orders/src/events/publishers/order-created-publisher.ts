import { Subjects,Publisher,OrderCreatedEvent, OrderCancelledEvent } from "@eterosoft/common";

export class OrderCreatedublisher extends Publisher<OrderCreatedEvent>{
    subject:Subjects.OrderCreated = Subjects.OrderCreated
    
}
