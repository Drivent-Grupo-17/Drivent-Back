import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotelsWithRooms } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken)
hotelsRouter.get('/', getHotels)
hotelsRouter.get('/:hotelId', getHotelsWithRooms);

export { hotelsRouter };
