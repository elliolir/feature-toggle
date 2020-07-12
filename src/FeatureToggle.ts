import optimizely from '@optimizely/optimizely-sdk';

import { IActivateABTest } from './interfaces';

/*
    Abstraction over vendor's SDK in order to decouple them
 */
interface FeatureToggleClientInterface {
    isFeatureEnabled(featureKey: string, userId: string, attributes?: Record<string, string>): void
    getFeatureVariable(featureKey: string, variableKey: string, userId: string, attributes?: Record<string, string>): void
}

class FeatureToggle implements FeatureToggleClientInterface {
    private readonly optimizelyClient: optimizely.Client;

    constructor(optimizelyClient: optimizely.Client) {
        this.optimizelyClient = optimizelyClient;
    }

    isFeatureEnabled(featureKey: string, userId: string, attributes?: Record<string, string>): boolean {
        return this.optimizelyClient.isFeatureEnabled(featureKey, userId, attributes);
    }

    getFeatureVariable(featureKey: string, variableKey: string, userId: string, attributes?: Record<string, string>) {
        return this.optimizelyClient.getFeatureVariable(featureKey, variableKey, userId, attributes);
    }

}

const getFeatureToggle = async (sdkKey: string): Promise<FeatureToggle>  => {
    const optimizelyClient = optimizely.createInstance({sdkKey});

    const {success, reason} = await optimizelyClient.onReady();

    if (!success) {
        throw new Error(reason);
    }
    else {
        return new FeatureToggle(optimizelyClient)
    }
}

const activateABTest = ({
    sdkKey, featureName, userId, controlCallback, treatmentCallback, defaultCallback
}: IActivateABTest): void => {
    const optimizelyClient = optimizely.createInstance({sdkKey});
    const variation = optimizelyClient.activate(featureName, userId);
    if (variation === 'control') {
        controlCallback && controlCallback();
    } else if (variation === 'treatment') {
        treatmentCallback && treatmentCallback();
    } else {
        defaultCallback && defaultCallback();
    }
};


export { FeatureToggleClientInterface, getFeatureToggle, activateABTest };
