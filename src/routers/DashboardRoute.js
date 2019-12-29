import React from 'react';
import { Route } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import { Header, Footer, fullWidth } from '../components/common';
import { themeColors } from '../components/common/ColorMap';

export const DashboardRoute = ({ path, exact, noBack, component: Component, ...rest }) => {
  return (
    <Route exact={exact} path={path} render={props => (
      <View style={styles.screenContainer}>
        <Header noBack={noBack} />
        <View style={styles.componentContent}>
          <Component {...props} {...rest} />
        </View>
        <Footer />
      </View>
    )}
    />
  )
};

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    backgroundColor: themeColors.body,
    flex: 1,
    paddingTop: 60,
    width: '100%',
  },
  componentContent: {
    alignItems: 'center',
    marginBottom: 50,
    width: fullWidth
  }
});