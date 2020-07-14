export interface FeatureToggleClientInterface {
    isFeatureEnabled(featureKey: string, userId: string, attributes?: Record<string, string>): void
    getFeatureVariable(featureKey: string, variableKey: string, userId: string, attributes?: Record<string, string>): void
    activateFeatureABTest(experimentKey: string, userId: string, attributes?: Record<string, string>): string | null
}
