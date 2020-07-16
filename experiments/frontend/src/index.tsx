import React from 'react';
import ReactDOM from 'react-dom';
import { createInstance, OptimizelyProvider } from '@optimizely/react-sdk';
import { v4 as uuidv4 } from 'uuid';

import App from './App';

import './fonts/AvenirNext/AvenirNext-Medium.ttf';
import './fonts/AvenirNext/AvenirNext-Bold.ttf';
import './fonts/AvenirNext/AvenirNext-DemiBold.ttf';
import './fonts/AvenirNext/AvenirNext-Regular.ttf';

import './index.css';

const optimizely = createInstance({
  sdkKey: process.env.REACT_APP_SDK_KEY,
  datafileOptions: {
    autoUpdate: true,
    updateInterval: Number(process.env.REACT_APP_FT_UPDATE),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <OptimizelyProvider optimizely={optimizely} user={{ id: uuidv4() }}>
      <App />
    </OptimizelyProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
