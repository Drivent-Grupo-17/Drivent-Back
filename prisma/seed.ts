import { faker } from '@faker-js/faker';
import { Activity, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();
import { ActivitySeed, LocationActivity } from '../src/protocols';

<<<<<<< HEAD

=======
async function clearDatabase() {
  await prisma.address.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.ticketType.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.activity.deleteMany({});
  console.log('Database cleared.');
}
>>>>>>> fe9dbc56c3612d0b25a2eb6f9286f617e5f464c6

async function main() {

  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  await prisma.ticketType.create({
    data: {
      name: 'Presencial',
      price: 25000,
      isRemote: false,
      includesHotel: true,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: 'Presencial',
      price: 25000,
      isRemote: false,
      includesHotel: false,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: 'Online',
      price: 10000,
      isRemote: true,
      includesHotel: false,
    },
  });

  console.log('Creating hotels...\n');

  const hotel1 = await prisma.hotel.create({
    data: {
      image: 'https://user-images.githubusercontent.com/114487600/258648219-b952e5a5-c999-401d-b8b2-967869bfa5b0.png',
      name: 'Driven Resort',
    },
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      image: 'https://user-images.githubusercontent.com/114487600/258648236-b8b8453e-ca10-4f5e-b729-2d8fc1288e8f.png',
      name: 'Driven Palace',
    },
  });

  const hotel3 = await prisma.hotel.create({
    data: {
      image: 'https://user-images.githubusercontent.com/114487600/258648248-934a6e66-19dc-476e-a543-545ec4fded6f.png',
      name: 'Driven World',
    },
  });

  await prisma.room.deleteMany({});
  console.log('Creating rooms...\n');

  function generateRooms(hotelId: number, floors: number) {
    const array: any = [];
    const roomsPerFloor = 10;

    for (let floor = 1; floor <= floors; floor++) {
      for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
        const room = {
          capacity: floor,
          name: `${floor}${roomNumber < 10 ? '0' : ''}${roomNumber}`,
          hotelId,
        };
        array.push(room);
      }
    }

    return array;
  }

  const roomsHotel1 = generateRooms(hotel1.id, 2);
  await prisma.room.createMany({ data: roomsHotel1 });
  const roomshotel2 = generateRooms(hotel2.id, 3);
  await prisma.room.createMany({ data: roomshotel2 });
  const roomsHotel3 = generateRooms(hotel3.id, 2);
  await prisma.room.createMany({ data: roomsHotel3 });

  function generateActivities(
    names: Array<string>,
    location: string,
    startsAt: Array<string>,
    endsAt: Array<string>,
    min: number,
  ) {
    const array: ActivitySeed = [];

    for (let i = 0; i < names.length; i++) {
      const activity = {
        name: names[i],
        location,
        capacity: Math.floor(Math.random() * min) + 10,
        startsAt: new Date(startsAt[i]),
        endsAt: new Date(endsAt[i]),
      };
      array.push(activity);
    }

    return array;
  }

  const activitiesPrincipal = generateActivities(
    ['Jogar minecraft', 'Jogar lol', 'Jogar CS'],
    LocationActivity.Principal,
    ['2023-10-27T09:00:00', '2023-10-27T13:00:00', '2023-10-28T18:00:00'],
    ['2023-10-27T10:00:00', '2023-10-27T14:30:00', '2023-10-28T20:00:00'],
    10,
  );
  console.log(activitiesPrincipal);
  await prisma.activity.createMany({
    data: activitiesPrincipal,
  });

  const activitiesLateral = generateActivities(
    ['Aula de cozinha', 'Aula de futebol', 'Aula de videogame'],
    LocationActivity.Lateral,
    ['2023-10-27T09:00:00', '2023-10-27T13:00:00', '2023-10-28T18:00:00'],
    ['2023-10-27T10:00:00', '2023-10-27T14:30:00', '2023-10-28T20:00:00'],
    12,
  );
  await prisma.activity.createMany({
    data: activitiesLateral,
  });

  const activitiesWorkshop = generateActivities(
    ['Palestra x', 'Palestra y', 'Palestra z'],
    LocationActivity.Workshop,
    ['2023-10-27T09:00:00', '2023-10-27T13:00:00', '2023-10-28T18:00:00'],
    ['2023-10-27T10:00:00', '2023-10-27T14:30:00', '2023-10-28T20:00:00'],
    15,
  );
  await prisma.activity.createMany({
    data: activitiesWorkshop,
  });

  console.log({ event });
  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient } from "@prisma/client";
// import dayjs from "dayjs";
// const prisma = new PrismaClient();

// async function main() {
//   let event = await prisma.event.findFirst();
//   if (!event) {
//     event = await prisma.event.create({
//       data: {
//         title: "Driven.t",
//         logoImageUrl: "https://files.driven.com.br/images/logo-rounded.png",
//         backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
//         startsAt: dayjs().toDate(),
//         endsAt: dayjs().add(21, "days").toDate(),
//       },
//     });
//   }

//   console.log({ event });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
