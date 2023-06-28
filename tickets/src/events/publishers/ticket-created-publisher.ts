import { Publisher, Subjects, TicketCreatedEvent } from '@eterosoft/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
