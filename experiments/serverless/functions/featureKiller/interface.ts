import { IEnvironments } from '../../utils/interfaces';

interface IFeatureKiller {
  featureId: number;
}

interface IPayload {
  environments: IEnvironments;
}

export { IFeatureKiller, IPayload };
