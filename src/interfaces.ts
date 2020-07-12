export type Noop = () => void;

export interface IActivateABTest {
    sdkKey: string,
    featureName: string,
    userId: string,
    controlCallback?: Noop,
    treatmentCallback?: Noop,
    defaultCallback?: Noop
};
