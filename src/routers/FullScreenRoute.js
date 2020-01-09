import React, { useEffect } from 'react';
import { Route } from 'react-router-native';
import { HideNavigationBar, ShowNavigationBar } from 'react-native-navigation-bar-color';

export const FullScreenRoute = ({ path, exact, fullWidth, component: Component, ...rest }) => {
  useEffect(() => {
    HideNavigationBar();
    return () => ShowNavigationBar();
  }, [])

  return (
    <Route
      exact={exact}
      path={path}
      render={props => <Component {...props} {...rest} />}
    />
  )
};