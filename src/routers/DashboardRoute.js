import React from 'react';
import { Route } from 'react-router-native';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Header, Footer } from '../components/common';
import { themeColors } from '../components/common/ColorMap';

export const DashboardRoute = ({ path, exact, noBack, fullWidth, component: Component, ...rest }) => {

  const styles = StyleSheet.create({
    screenContainer: {
      alignItems: 'center',
      backgroundColor: themeColors.body,
      // flex: 1,
      height: Dimensions.get('window').height,
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
