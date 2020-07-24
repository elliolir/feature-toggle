import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';

import { getResponse } from '../helpers';
import featureToggleWrapper from '../utils/featureToggleWrapper';
import logger from '../utils/logger';

const SDK_KEY = process.env.SDK_KEY;
const FEATURE_KEY = process.env.FEATURE_KEY;

const lambda = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult | never> => {
  logger.info({ payload: event, requestId: context.awsRequestId }, 'Event');

  if (event.queryStringParameters?.kill) {
    logger.error('Mama, I just killed a man!');
    throw new Error('Mama, I just killed a man!');
  }
  return getResponse(200, { message: 'Feature is on!' });
};

export const handler = featureToggleWrapper(SDK_KEY, FEATURE_KEY)(lambda);
