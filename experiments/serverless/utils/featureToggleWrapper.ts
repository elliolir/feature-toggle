import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context,
  Callback,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { getFeatureToggle } from '../../../src';

import { getResponse } from '../helpers';

import { FEATURE_ERROR_PATTERN } from './constants';

const featureToggleWrapper = (SDK_KEY: string, featureKey: string) => (
  lambdaHandler: APIGatewayProxyHandler,
) => async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>,
): Promise<APIGatewayProxyResult | never | void> => {
  console.info('Event: ', event);

  if (!SDK_KEY || !featureKey) {
    throw new Error('Please provide feature key and SDK key');
  }

  const featureToggleClient = await getFeatureToggle(SDK_KEY);

  const featureEnabled = featureToggleClient.isFeatureEnabled(featureKey, 'dmitry');

  if (featureEnabled) {
    try {
      return await lambdaHandler(event, context, callback);
    } catch (error) {
      console.error(`${FEATURE_ERROR_PATTERN}: ${featureKey}`);
      throw error; // TODO investigate other options of triggering cloudwatch errors
    }
  } else {
    return getResponse(404, { message: 'Not found' });
  }
};

export default featureToggleWrapper;
