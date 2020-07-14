export interface FeatureToggleClientInterface {
    isFeatureEnabled(featureKey: string, userId: string, attributes?: Record<string, string>): boolean
    getFeatureVariable(featureKey: string, variableKey: string, userId: string, attributes?: Record<string, string>): unknown
    activateFeatureABTest(experimentKey: string, userId: string, attributes?: Record<string, string>): string | null
}
