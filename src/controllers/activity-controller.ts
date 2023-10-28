import { Response } from 'express';
import httpStatus from 'http-status';
import { requestError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import { activityService } from '@/services/activity-service';

async function get(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const date = req.query.date;
  if (!date) {
    throw requestError(400, 'Bad Request');
  }
  console.log(date);
  const response = await activityService.get(userId, date);
  res.status(httpStatus.OK).send(response);
}

async function create(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;

  await activityService.create(userId, activityId);
  res.status(httpStatus.CREATED).send('Activity registered');
}

async function getDays(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const response = await activityService.getDays(userId);
  res.status(httpStatus.OK).send(response);
}

export const activityController = { get, create, getDays };
