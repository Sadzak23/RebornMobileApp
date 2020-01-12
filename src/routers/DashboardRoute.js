import React, { useEffect } from 'react';
import { Route } from 'react-router-native';
import { View, StyleSheet, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Header, Footer } from '../components/common';
import { themeColors } from '../components/common/ColorMap';

export const DashboardRoute = ({ path, exact, noBack, fullWidth, component: Component, ...rest }) => {
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => Orientation.unlockAllOrientations();
    }, [])

  const styles = StyleSheet.create({
    screenContainer: {
      alignItems: 'center',
      backgroundColor: themeColors.body,
      height: '100%',
      paddingTop: 60,
      width: fullWidth,
    },
    componentContent: {
      alignItems: 'center',
      marginBottom: 50,
    }
  });

  return (
    <Route exact={exact} path={path} render={props => (
      <View style={styles.screenContainer}>
        <Header noBack={noBack} />
        <View style={styles.componentContent}>
          <Component {...props} {...rest} fullWidth={fullWidth} />
        </View>
        <Footer />
      </View>
    )}
    />
  )
};
