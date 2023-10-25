import { CreateSubscription } from '@/protocols';
import Joi from 'joi';

export const activitySchema = Joi.object<CreateSubscription>({
  activityId: Joi.number().integer().required(),
});
