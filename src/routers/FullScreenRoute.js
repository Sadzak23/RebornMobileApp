import React from 'react';
import { Route } from 'react-router-native';

export const FullScreenRoute = ({ path, exact, fullWidth, component: Component, ...rest }) => (
  <Route
    exact={exact}
    path={path}
    render={props => <Component {...props} {...rest} />}
  />
);