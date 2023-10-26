import { bookingRepository } from '@/repositories';
import { hotelsService } from './hotels-service';
import { canNotListActivities } from '@/errors/cannot-list-activities';
import { activityRepository } from '@/repositories/activity-repository';
import { DaysObject } from '@/protocols';

async function get(userId: number, date: string) {
  validateUserActivity(userId);
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1);
  const dateMoreOneDay = dateObj.toISOString();

  const response = await activityRepository.get(userId, date, dateMoreOneDay);
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

async function getDays(userId: number) {
  await validateUserActivity(userId);
  const daysOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  const response = await activityRepository.getDays();
  const days: DaysObject = response.map((element) => {
    const date = new Date(element.startsAt);
    const day = date.getDay();
    return {
      startsAt: element.startsAt.toISOString().split('T')[0],
      day: daysOfWeek[day],
    };
  });

  const daysFiltered: DaysObject = days.filter((element, index, self) => {
    return self.indexOf(element) === index;
  });

  return daysFiltered;
}

export const activityService = { get, create, getDays };
