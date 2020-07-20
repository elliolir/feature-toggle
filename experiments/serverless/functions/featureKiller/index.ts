import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { getResponse } from '../../helpers';

import { patchFeature } from './helpers';
import { IFeatureKiller, IFeatureKillerResult } from './interface';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log('Body: ', event.body);

  const { featureId }: IFeatureKiller = JSON.parse(event.body);
  console.log('Feature ID: ', featureId);

  const data: IFeatureKillerResult = await patchFeature(featureId);

  return getResponse(200, data);
};
