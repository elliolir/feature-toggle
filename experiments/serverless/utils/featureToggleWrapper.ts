import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context, Callback, APIGatewayProxyResult} from "aws-lambda";
import {getFeatureToggle} from "../../../src";
import {getResponse} from "../helpers";

const featureToggleWrapper = (SDK_KEY: string, featureName: string) => (lambdaHandler: APIGatewayProxyHandler) => async (event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>) => {
  console.log(event);

  if (!SDK_KEY) {
    throw new Error("No SDK key provided");
  }

  const featureToggleClient = await getFeatureToggle(SDK_KEY);

  if (featureToggleClient.isFeatureEnabled(featureName, "3456798765")) {
    return lambdaHandler(event, context, callback);
  }
  else {
    return getResponse(404, {message: "Not found"})
  }
}

export default featureToggleWrapper;
