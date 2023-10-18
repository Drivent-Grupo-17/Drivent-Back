import { ApplicationError } from '@/protocols';

export function ticketAlreadyExistsError(): ApplicationError {
  return {
    name: 'TicketAlreadyExistsError',
    message: 'Ticket already exists for this enrollment.',
  };
}
