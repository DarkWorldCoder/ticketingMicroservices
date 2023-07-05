import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@eterosoft/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price,location,imageUrl } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
      location,
      imageUrl
    
    });
    await ticket.save();

    msg.ack();
  }
}
