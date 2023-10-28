import { Router } from 'express';
import { activityController } from '@/controllers/activity-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { activitySchema } from '@/schemas/activity-schema';

const activityRouter = Router();

activityRouter
  .all('/*', authenticateToken)
  .get('/', activityController.get)
  .get('/days', authenticateToken, activityController.getDays)
  .post('/', validateBody(activitySchema), activityController.create);

export { activityRouter };
