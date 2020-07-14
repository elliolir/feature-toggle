import { APIGatewayProxyResult } from 'aws-lambda';
import {getResponse} from "../helpers";
import featureToggleWrapper from "../utils/featureToggleWrapper";

const SDK_KEY = process.env.SDK_KEY;

const lambda = async (): Promise<APIGatewayProxyResult> => {
  return getResponse(200, {message: "Feature is on!"})
};

export const handler = featureToggleWrapper(SDK_KEY, "test_feature")(lambda);
