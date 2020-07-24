import axios from 'axios';

import { API_KEY, API_URL, PROJECT_ID } from '../utils/constants';
import logger from '../utils/logger';

import { FeaturesList, IFeaturesMap } from './interfaces';

const listFeatures = async (): Promise<FeaturesList> => {
  const { data } = await axios({
    method: 'GET',
    url: `${API_URL}/v2/features?project_id=${PROJECT_ID}`,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data;
};

const getFeaturesMap = async (): Promise<IFeaturesMap> => {
  const featuresList: FeaturesList = await listFeatures();
  logger.debug({ payload: featuresList }, 'Features List');

  const featuresMap = featuresList.reduce((acc, curr) => {
    acc[curr.key] = curr.id;
    return acc;
  }, {});
  logger.debug({ payload: featuresMap }, 'Features Map');

  return featuresMap;
};

const getFeatureIdFromKey = async (featureKey: string): Promise<number> => {
  const featuresMap: IFeaturesMap = await getFeaturesMap();
  return featuresMap[featureKey];
};

export default getFeatureIdFromKey;
