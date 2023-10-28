import Joi from 'joi';
import { CreateSubscription } from '@/protocols';

export const activitySchema = Joi.object<CreateSubscription>({
  activityId: Joi.number().integer().required(),
});
