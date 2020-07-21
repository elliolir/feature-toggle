import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import {getResponse} from "../helpers";
import featureToggleWrapper from "../utils/featureToggleWrapper";

const SDK_KEY = process.env.SDK_KEY;
const FEATURE_NAME = process.env.FEATURE_NAME

const lambda = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult | never> => {
  if (event.queryStringParameters.kill) {
    throw new Error("Mama, I just killed a man!");
  }
  return getResponse(200, {message: "Feature is on!"})
};

export const handler = featureToggleWrapper(SDK_KEY, FEATURE_NAME)(lambda);
