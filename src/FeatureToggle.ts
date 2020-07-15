import optimizely from '@optimizely/optimizely-sdk';

import { FeatureToggleClientInterface } from './interfaces';

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

    activateFeatureABTest(experimentKey: string, userId: string, attributes?: Record<string, string>): string | null {
        return this.optimizelyClient.activate(experimentKey, userId, attributes);
    }

}

export default FeatureToggle;
