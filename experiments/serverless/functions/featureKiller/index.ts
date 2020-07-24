import { APIGatewayProxyResult, APIGatewayEvent, Context } from 'aws-lambda';

import { getResponse } from '../../helpers';
import { IFeature, IFeatureKiller } from '../../utils/interfaces';
import logger from '../../utils/logger';

import { patchFeature, isAPIGatewayEvent } from './helpers';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  logger.info({ payload: event, requestId: context.awsRequestId }, 'Event');

  const { featureId, featureKey }: IFeatureKiller = isAPIGatewayEvent(event)
    ? JSON.parse(event.body)
    : event;
  logger.info({ payload: featureKey }, 'Feature Key');
  logger.info({ payload: featureId }, 'Feature Id');

  const data: IFeature = await patchFeature(featureId);
  logger.info({ payload: data }, 'Feature Data');

  return getResponse(200, data);
};
