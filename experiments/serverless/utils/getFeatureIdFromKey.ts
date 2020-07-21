import axios from 'axios';

import { API_KEY, API_URL, PROJECT_ID } from '../utils/constants';

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
  console.log('Features List: ', featuresList);

  const featuresMap = featuresList.reduce((acc, curr) => {
    acc[curr.key] = curr.id;
    return acc;
  }, {});
  console.log('Features Map: ', featuresMap);

  return featuresMap;
};

const getFeatureIdFromKey = async (featureKey: string): Promise<number> => {
  const featuresMap: IFeaturesMap = await getFeaturesMap();
  return featuresMap[featureKey];
};

export default getFeatureIdFromKey;
