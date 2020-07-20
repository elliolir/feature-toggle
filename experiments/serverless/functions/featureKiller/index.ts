import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { getResponse } from '../../helpers';
import getFeatureIdFromKey from '../../utils/getFeatureIdFromKey';
import { IFeature } from '../../utils/interfaces';

import { patchFeature } from './helpers';
import { IFeatureKiller } from './interface';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  console.log('Body: ', event.body);

  const { featureId }: IFeatureKiller = JSON.parse(event.body);
  console.log('Feature ID: ', featureId);

  const feature = await getFeatureIdFromKey('home_route');
  console.log('Feature: ', feature);

  const data: IFeature = await patchFeature(featureId);

  return getResponse(200, data);
};
