import { prisma } from '@/config';

async function get(userId: number, date: Date, dateMoreOneDay: Date) {
  const response = await prisma.activity.findMany({
    orderBy: { startsAt: 'asc' },
    where: { startsAt: { gte: date, lte: dateMoreOneDay } },
    include: { _count: { select: { Subscription: true } }, Subscription: { select: { id: true }, where: { userId } } },
  });

  return response;
}

async function create(userId: number, activityId: number) {
  return await prisma.subscription.create({
    data: {
      userId,
      activityId,
    },
  });
}

async function getDays() {
  const response = await prisma.activity.findMany({
    select: { startsAt: true },
    orderBy: { startsAt: 'asc' },
  });
  return response;
}

export const activityRepository = { get, create, getDays };
