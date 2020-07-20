import axios from 'axios';

import { IPayload, IFeatureKillerResult } from './interface';
import { API_KEY, ROLLOUT_TRAFFIC } from './constants';

const patchPayload: IPayload = {
  environments: {
    development: {
      rollout_rules: [
        {
          audience_conditions: 'everyone',
          enabled: true,
          percentage_included: ROLLOUT_TRAFFIC.OFF,
        },
      ],
    },
    production: {
      rollout_rules: [
        {
          audience_conditions: 'everyone',
          enabled: true,
          percentage_included: ROLLOUT_TRAFFIC.OFF,
        },
      ],
    },
  },
};

const patchFeature = async (featureId: number): Promise<IFeatureKillerResult> => {
  const { data } = await axios({
    method: 'PATCH',
    url: `https://api.optimizely.com/v2/features/${featureId}`,
    data: patchPayload,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data;
};

export { patchFeature };
