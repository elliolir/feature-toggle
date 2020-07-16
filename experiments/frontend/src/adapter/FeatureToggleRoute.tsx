import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { FeatureToggleClientInterface } from './interfaces';

const getFeatureToggleRoute = (featureToggle: FeatureToggleClientInterface) => ({
  component: Component,
  feature,
  userId = uuidv4(),
  redirectTo = '/',
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        featureToggle.isFeatureEnabled(feature, userId) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: redirectTo }} />
        )
      }
    />
  );
};

export default getFeatureToggleRoute;
