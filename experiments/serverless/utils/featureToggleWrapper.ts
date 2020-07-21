import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context, Callback, APIGatewayProxyResult} from "aws-lambda";
import {getFeatureToggle} from "../../../src";
import {getResponse} from "../helpers";

const featureToggleWrapper = (SDK_KEY: string, featureName: string) =>
  (lambdaHandler: APIGatewayProxyHandler) =>
    async (event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>): Promise<APIGatewayProxyResult | never | void> => {
  console.log(event);

  if (!SDK_KEY || !featureName) {
    throw new Error("Please provide feature name and SDK key");
  }

  const featureToggleClient = await getFeatureToggle(SDK_KEY);

  if (featureToggleClient.isFeatureEnabled(featureName, "3456798765")) {
    try {
      return lambdaHandler(event, context, callback);
    }
    catch(error) {
      console.error("FEATURE_ERROR:", featureName);
      console.error("FEATURE_ERROR_PAYLOAD:", JSON.stringify(error, null, 2));
      throw error; // TODO investigate other options of triggering cloudwatch errors
    }

  }
  else {
    return getResponse(404, {message: "Not found"})
  }
}

export default featureToggleWrapper;
