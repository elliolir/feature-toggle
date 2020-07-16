import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { OptimizelyFeature } from '@optimizely/react-sdk';

const FeatureToggleRoute = ({
  component: Component,
  feature,
  redirectTo = '/',
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <OptimizelyFeature feature={feature}>
          {(isEnabled) =>
            isEnabled ? <Component {...props} /> : <Redirect to={{ pathname: redirectTo }} />
          }
        </OptimizelyFeature>
      )}
    />
  );
};

 export default FeatureToggleRoute;