import { Publisher, OrderCreatedEvent, Subjects } from '@eterosoft/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
