import { Subjects, Publisher, PaymentCreatedEvent } from '@eterosoft/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
