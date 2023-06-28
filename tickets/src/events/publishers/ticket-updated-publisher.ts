import { Publisher, Subjects, TicketUpdatedEvent } from '@eterosoft/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
