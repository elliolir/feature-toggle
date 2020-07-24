import { SNSEvent, SNSMessage } from 'aws-lambda';
import { Lambda, CloudWatchLogs } from 'aws-sdk';

import { FEATURE_ERROR_PATTERN, FEATURE_ERROR_REGEX } from '../../utils/constants';
import getFeatureIdFromKey from '../../utils/getFeatureIdFromKey';
import { IFeatureKiller } from '../../utils/interfaces';
import logger from '../../utils/logger';

const lambda = new Lambda({
  region: process.env.AWS_REGION,
});
const logs = new CloudWatchLogs();

const getErrorSource = (event: SNSEvent): string => {
  const { Sns }: { Sns: SNSMessage } = event.Records[0];

  const snsMessage = JSON.parse(Sns.Message);
  logger.debug({ payload: snsMessage }, 'Sns Message');

  const { value } = snsMessage.Trigger.Dimensions[0];

  return value;
};

const findFeatureKey = async (errorSource: string): Promise<string> => {
  const logParams: CloudWatchLogs.FilterLogEventsRequest = {
    logGroupName: `/aws/lambda/${errorSource}`,
    filterPattern: `ERROR ${FEATURE_ERROR_PATTERN}`,
  };

  const featureLogs = await logs.filterLogEvents(logParams).promise();
  logger.debug({ payload: featureLogs }, 'Feature Logs');

  const featureMessage: CloudWatchLogs.FilteredLogEvent = featureLogs.events.pop();
  logger.debug({ payload: featureMessage }, 'Feature Message');

  const featureKey: string = JSON.parse(featureMessage.message)
    .msg.match(FEATURE_ERROR_REGEX)[1]
    .trim();

  return featureKey;
};

const getFeatureKillerPayload = async (featureKey: string): Promise<IFeatureKiller> => {
  const featureId: number = await getFeatureIdFromKey(featureKey);
  logger.debug({ payload: featureId }, 'Feature Id');

  const featureKillerPayload: IFeatureKiller = {
    featureKey,
    featureId,
  };

  return featureKillerPayload;
};

const triggerFeatureKill = async (
  featureKillerPayload: IFeatureKiller,
): Promise<Lambda.InvocationResponse> => {
  const params: Lambda.InvocationRequest = {
    FunctionName: process.env.FEATURE_KILLER,
    InvocationType: 'Event',
    Payload: JSON.stringify(featureKillerPayload),
  };

  const result = await lambda.invoke(params).promise();

  return result;
};

export { getErrorSource, findFeatureKey, getFeatureKillerPayload, triggerFeatureKill };
