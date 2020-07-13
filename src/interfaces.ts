export interface BaseFeatureMethodProps {
    featureKey: string,
    userId: string,
    attributes?: Record<string, string>
}

export interface GetFeatureVariableProps extends BaseFeatureMethodProps {
    variableKey: string
}

export interface FeatureToggleClientInterface {
    isFeatureEnabled(params: BaseFeatureMethodProps): void
    getFeatureVariable(params: GetFeatureVariableProps): void
    activateFeatureABTest(params: BaseFeatureMethodProps): string | null
}
