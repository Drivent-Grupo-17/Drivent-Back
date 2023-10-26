import { activityController } from '@/controllers/activity-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { activitySchema } from '@/schemas/activity-schema';
import { Router } from 'express';

const activityRouter = Router();

activityRouter
  .all('/*', authenticateToken)
  .get('/:date', activityController.get)
  .get('/days', authenticateToken, activityController.getDays)
  .post('/', validateBody(activitySchema), activityController.create);

export { activityRouter };
