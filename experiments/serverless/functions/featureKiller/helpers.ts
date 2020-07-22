import axios from 'axios';
import { APIGatewayEvent } from 'aws-lambda';

import { API_KEY, API_URL, ROLLOUT_TRAFFIC } from '../../utils/constants';
import { IFeature, IFeatureKiller } from '../../utils/interfaces';

import { IPayload } from './interface';

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

const patchFeature = async (featureId: number): Promise<IFeature> => {
  const { data } = await axios({
    method: 'PATCH',
    url: `${API_URL}/v2/features/${featureId}`,
    data: patchPayload,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data;
};

const isAPIGatewayEvent = (event: APIGatewayEvent | IFeatureKiller): boolean => {
  return !!(<APIGatewayEvent>event).body;
};

export { patchFeature, isAPIGatewayEvent };
