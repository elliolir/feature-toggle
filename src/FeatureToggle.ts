import optimizely from '@optimizely/optimizely-sdk';

class FeatureToggle {
    optimizely: optimizely.Client

    constructor(sdkKey: string) {
        this.optimizely = optimizely.createInstance({sdkKey});
    }
}


export default FeatureToggle;