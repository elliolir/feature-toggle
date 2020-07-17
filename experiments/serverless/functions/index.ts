import { APIGatewayProxyResult } from 'aws-lambda';
import {getResponse} from "../helpers";
import featureToggleWrapper from "../utils/featureToggleWrapper";

const SDK_KEY = process.env.SDK_KEY;

class CustomError extends Error {
  payload: Record<string, unknown>

  constructor(message, payload){
    super(message);
    this.payload = payload;
  }
}

const lambda = async (): Promise<APIGatewayProxyResult> => {
  throw new CustomError("error while handling tast feature", {pay: "load", test: "data", num: 123});
  return getResponse(200, {message: "Feature is on!"});
};

export const handler = featureToggleWrapper(SDK_KEY, "test_feature")(lambda);
