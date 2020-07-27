import { SNSEvent, Context } from 'aws-lambda';

import logger from '../../utils/logger';

import {
  getErrorSource,
  findFeatureKey,
  getFeatureKillerPayload,
  triggerFeatureKill,
} from './helpers';

export const handler = async (event: SNSEvent, context: Context): Promise<void> => {
  logger.info({ payload: event, requestId: context.awsRequestId }, 'Event');

  const errorSource = getErrorSource(event);
  logger.info({ payload: errorSource }, 'Error Source');

  const featureKey = await findFeatureKey(errorSource);
  logger.info({ payload: featureKey }, 'Feature Key');

  const featureKillerPayload = await getFeatureKillerPayload(featureKey);
  logger.info({ payload: featureKillerPayload }, 'Feature Killer Payload');

  const result = await triggerFeatureKill(featureKillerPayload);
  logger.info({ payload: result }, 'Result');
};
