import optimizely from "@optimizely/optimizely-sdk";
import FeatureToggle from "./FeatureToggle";
import { FeatureToggleClientInterface } from "./interfaces";

const getFeatureToggle = async (sdkKey: string): Promise<FeatureToggleClientInterface>  => {
  const optimizelyClient = optimizely.createInstance({sdkKey});

  const {success, reason} = await optimizelyClient.onReady();

  if (!success) {
    throw new Error(reason);
  }
  else {
    return new FeatureToggle(optimizelyClient)
  }
}

export { getFeatureToggle }
