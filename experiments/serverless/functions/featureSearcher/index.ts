import { SNSEvent } from 'aws-lambda';

import {
  getErrorSource,
  findFeatureKey,
  getFeatureKillerPayload,
  triggerFeatureKill,
} from './helpers';

export const handler = async (event: SNSEvent): Promise<void> => {
  console.info('SNS Event: ', JSON.stringify(event, null, 2));

  const errorSource = getErrorSource(event);
  console.info('Error Source: ', errorSource);

  const featureKey = await findFeatureKey(errorSource);
  console.info('Feature Key: ', featureKey);

  const featureKillerPayload = await getFeatureKillerPayload(featureKey);
  console.info('Feature Killer Payload: ', featureKillerPayload);

  const result = await triggerFeatureKill(featureKillerPayload);
  console.info('Result: ', result);
};
