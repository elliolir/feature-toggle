import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {getResponse} from "../helpers";
import {getFeatureToggle, FeatureToggleClientInterface} from "../../../src/FeatureToggle";
const SDK_KEY = process.env.SDK_KEY;

export const handler =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);

    if (!SDK_KEY) {
        throw new Error("No SDK key provided");
    }

    const featureToggleClient: FeatureToggleClientInterface = await getFeatureToggle(SDK_KEY);
    if (featureToggleClient.isFeatureEnabled("test_feature", "3456798765")) {
        return getResponse(200, {message: "Feature is on!"})
    }
    else {
        return getResponse(200, {message: "Feature is off!"})
    }
};
