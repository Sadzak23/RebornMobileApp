import React, { useEffect } from 'react';
import { Route } from 'react-router-native';
import { AppState, View, ImageBackground } from 'react-native';
import ImmersiveMode from 'react-native-immersive-mode';
import { themeColors } from '../components/common';
import backgroundImg from '../images/female-5x5.jpg';


export const StrongLiftRoute = ({ path, exact, fullWidth, component: Component, ...rest }) => {
  return (
    <Route exact={exact} path={path} render={props => (
      <ImageBackground source={backgroundImg} style={{ flex: 1 }}>
        <Component {...props} {...rest} />
      </ImageBackground>
    )}
    />
  )
};

export const FullScreenRoute = ({ path, exact, fullWidth, component: Component, ...rest }) => {
  // useEffect(() => {
  //   const onChange = () => {
  //     ImmersiveMode.fullLayout(true)
  //     ImmersiveMode.setBarMode('FullSticky')
  //   }
  //   onChange()
  //   AppState.addEventListener('change', onChange);
  //   return () => {
  //     AppState.removeEventListener('change', onChange);
  //     ImmersiveMode.fullLayout(false)
  //     ImmersiveMode.setBarMode('Normal')
  //   }
  // }, [])

  return (
    <Route
      exact={exact}
      path={path}
      render={props => <View style={{ backgroundColor: themeColors.body, flex: 1 }}>
        <Component {...props} {...rest} />
      </View>}
    />
  )
};