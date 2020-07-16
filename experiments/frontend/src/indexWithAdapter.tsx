import React from 'react';
import ReactDOM from 'react-dom';

import { getFeatureToggle } from 'adapter/FeatureToggle';
import App from './AppWithAdapter';

import './fonts/AvenirNext/AvenirNext-Medium.ttf';
import './fonts/AvenirNext/AvenirNext-Bold.ttf';
import './fonts/AvenirNext/AvenirNext-DemiBold.ttf';
import './fonts/AvenirNext/AvenirNext-Regular.ttf';

import './index.css';

(async () => {
  const featureToggle = await getFeatureToggle({
    sdkKey: process.env.REACT_APP_SDK_KEY || '',
    updateInterval: Number(process.env.REACT_APP_FT_UPDATE) || 5000,
  });

  ReactDOM.render(
    <React.StrictMode>
      <App featureToggle={featureToggle} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
})();
