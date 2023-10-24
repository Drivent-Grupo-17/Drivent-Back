import { AuthenticatedRequest } from '@/middlewares';
import { activityService } from '@/services/activity-service';
import { Response } from 'express';
import httpStatus from 'http-status';

async function get(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const response = await activityService.get(userId);
  res.status(httpStatus.OK).send(response);
}

async function create(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const activityId: number = req.body;

  await activityService.create(userId, activityId);
  res.status(httpStatus.CREATED).send('Activity registered');
}

export const activityController = { get, create };
