import { bookingRepository } from '@/repositories';
import { hotelsService } from './hotels-service';
import { canNotListActivities } from '@/errors/cannot-list-activities';
import { activityRepository } from '@/repositories/activity-repository';

async function get(userId: number) {
  validateUserActivity(userId);

  const response = await activityRepository.get(userId);
  return response;
}

async function validateUserActivity(userId: number) {
  await hotelsService.validateUserBooking(userId);

  const booking = bookingRepository.findByUserId(userId);
  if (!booking) {
    throw canNotListActivities('Usuário não possui reserva!');
  }
}

async function create(userId: number, activityId: number) {
  await validateUserActivity(userId);

  await activityRepository.create(userId, activityId);
  return;
}

export const activityService = { get, create };
