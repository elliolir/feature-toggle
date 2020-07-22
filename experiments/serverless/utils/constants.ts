const API_KEY = process.env.API_KEY;
const PROJECT_ID = process.env.PROJECT_ID;
const API_URL = 'https://api.optimizely.com';

const ROLLOUT_TRAFFIC = {
  OFF: 0,
  FULL: 10000,
};

const FEATURE_ERROR_PATTERN = 'FEATURE_ERROR';
const FEATURE_ERROR_REGEX = new RegExp(`${FEATURE_ERROR_PATTERN}:(.*)`);

export {
  API_KEY,
  PROJECT_ID,
  API_URL,
  ROLLOUT_TRAFFIC,
  FEATURE_ERROR_PATTERN,
  FEATURE_ERROR_REGEX,
};
