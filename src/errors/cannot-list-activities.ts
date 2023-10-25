import { ApplicationError } from '@/protocols';

export function canNotListActivities(message: string): ApplicationError {
  return {
    name: 'canNotListActivities',
    message,
  };
}
