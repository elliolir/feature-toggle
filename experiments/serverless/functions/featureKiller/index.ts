import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { getResponse } from '../../helpers';
import { IFeature, IFeatureKiller } from '../../utils/interfaces';

import { patchFeature, isAPIGatewayEvent } from './helpers';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.info('Event: ', event);

  const { featureId, featureKey }: IFeatureKiller = isAPIGatewayEvent(event)
    ? JSON.parse(event.body)
    : event;
  console.info('Feature Key: ', featureKey);
  console.info('Feature Id: ', featureId);

  const data: IFeature = await patchFeature(featureId);
  console.info('Feature Data: ', data);

  return getResponse(200, data);
};
