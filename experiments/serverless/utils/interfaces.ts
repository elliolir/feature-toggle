interface IRolloutRule {
  audience_conditions: string;
  enabled?: boolean;
  percentage_included?: number;
}

interface IEnvironments {
  development: {
    id?: number;
    is_primary?: boolean;
    rollout_rules: IRolloutRule[];
  };
  production: {
    id?: number;
    is_primary?: boolean;
    rollout_rules: IRolloutRule[];
  };
}

interface IFeature {
  id: number;
  key: string;
  name: string;
  description: string;
  project_id: number;
  environments: IEnvironments;
  variables: Array<{
    [key: string]: string;
  }>;
  archived: boolean;
  created: string;
  last_modified: string;
}

type FeaturesList = IFeature[];

interface IFeaturesMap {
  [key: string]: number;
}

interface IFeatureKiller {
  featureKey?: string;
  featureId: number;
}

export { IRolloutRule, IEnvironments, IFeature, FeaturesList, IFeaturesMap, IFeatureKiller };
