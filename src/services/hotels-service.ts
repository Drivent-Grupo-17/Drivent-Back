import { TicketStatus } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import { enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';

async function validateUserBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const type = ticket.TicketType;

  if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function getHotels(userId: number) {
  await validateUserBooking(userId);

  const hotels = await hotelRepository.findHotels();
  if (hotels.length === 0) throw notFoundError();
  const capacity = await hotelRepository.sumCapacity();
  console.log(hotels[0].Rooms);
  const hotelsInfo = hotels.map((element, index) => {
    let count = 0;
    let roomCapacityMax = 1;
    element.Rooms.forEach((element) => {
      if (element.capacity > roomCapacityMax) {
        roomCapacityMax = element.capacity;
      }
      if (element.Booking.length === 0) {
      } else if (element.Booking.length > 0) {
        count++;
      }
    });
    return {
      id: element.id,
      name: element.name,
      image: element.image,
      createdAt: element.createdAt,
      updatedAt: element.updatedAt,
      accommodationMax: roomCapacityMax,
      bookings: count,
      capacity: capacity[index]._sum.capacity,
    };
  });

  return hotelsInfo;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await validateUserBooking(userId);

  if (!hotelId || isNaN(hotelId)) throw invalidDataError('hotelId');

  const hotelWithRooms = await hotelRepository.findRoomsByHotelId(hotelId);
  if (!hotelWithRooms) throw notFoundError();

  return hotelWithRooms;
}

export const hotelsService = {
  getHotels,
  getHotelsWithRooms,
};
