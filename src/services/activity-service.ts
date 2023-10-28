import { hotelsService } from './hotels-service';
import { bookingRepository } from '@/repositories';
import { canNotListActivities } from '@/errors/cannot-list-activities';
import { activityRepository } from '@/repositories/activity-repository';
import { DaysObject } from '@/protocols';

async function get(userId: number, date: any) {
  validateUserActivity(userId);
  const dateCorrect = new Date(date);
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1);

  const response = await activityRepository.get(userId, dateCorrect, dateObj);
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

  const daysFiltered = filterDays(days);

  return daysFiltered;
}

function filterDays(days: DaysObject) {
  const set = new Set();
  return days.filter((element) => {
    const key = `${element.day}-${element.startsAt}`;

    if (!set.has(key)) {
      set.add(key);
      return true;
    }

    return false;
  });
}

export const activityService = { get, create, getDays };
