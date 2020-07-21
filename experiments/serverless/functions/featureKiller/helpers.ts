import axios from 'axios';

import { API_KEY, API_URL, ROLLOUT_TRAFFIC } from '../../utils/constants';
import { IFeature } from '../../utils/interfaces';

import { IPayload } from './interface';
import {APIGatewayEvent, SNSEvent} from "aws-lambda";

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

const isAPIGatewayEvent = (event: APIGatewayEvent | SNSEvent): event is APIGatewayEvent => {
  return !!(<APIGatewayEvent>event).body;
}

export { patchFeature, isAPIGatewayEvent };
