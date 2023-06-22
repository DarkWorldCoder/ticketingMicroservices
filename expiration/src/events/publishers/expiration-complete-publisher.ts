import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@eterosoft/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
