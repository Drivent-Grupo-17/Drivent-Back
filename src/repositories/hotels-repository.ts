import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      Rooms: { select: { Booking: true } },
    },
    orderBy: { id: 'asc' },
  });
}

async function sumCapacity() {
  return prisma.room.groupBy({
    by: ['hotelId'],
    _sum: { capacity: true },
    orderBy: { hotelId: 'asc' },
  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

export const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  sumCapacity,
};
