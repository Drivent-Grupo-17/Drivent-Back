import { prisma } from '@/config';

async function get(userId: number) {
  const response = await prisma.activity.findMany({
    orderBy: { startsAt: 'asc' },
    include: { _count: { select: { Subscription: true } }, Subscription: { select: { id: true }, where: { userId } } },
  });

  return response;
}

export const activityRepository = { get };
