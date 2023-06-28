import { Subjects, Publisher, OrderCancelledEvent } from '@eterosoft/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
