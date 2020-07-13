import optimizely from '@optimizely/optimizely-sdk';

import { FeatureToggleClientInterface, BaseFeatureMethodProps, GetFeatureVariableProps } from './interfaces';

class FeatureToggle implements FeatureToggleClientInterface {
    private readonly optimizelyClient: optimizely.Client;

    constructor(optimizelyClient: optimizely.Client) {
        this.optimizelyClient = optimizelyClient;
    }

    isFeatureEnabled({ featureKey, userId, attributes }: BaseFeatureMethodProps): boolean {
        return this.optimizelyClient.isFeatureEnabled(featureKey, userId, attributes);
    }

    getFeatureVariable({ featureKey, variableKey, userId, attributes }: GetFeatureVariableProps) {
        return this.optimizelyClient.getFeatureVariable(featureKey, variableKey, userId, attributes);
    }

    activateFeatureABTest({ featureKey, userId, attributes }: BaseFeatureMethodProps): string | null {
        return this.optimizelyClient.activate(featureKey, userId, attributes);
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

export { FeatureToggleClientInterface, getFeatureToggle };
