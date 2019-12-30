import React, { useState, useEffect} from 'react';
import { Route } from 'react-router-native';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Header, Footer } from '../components/common';
import { themeColors } from '../components/common/ColorMap';

export const DashboardRoute = ({ path, exact, noBack, component: Component, ...rest }) => {
  const [width, setWidth] = useState(Dimensions.get('window').width)
  useEffect(() => {
    Dimensions.addEventListener('change', () => { setWidth(Dimensions.get('window').width) })
    return Dimensions.removeEventListener('change', () => { setWidth(Dimensions.get('window').width) })
  }, []);

  const styles = StyleSheet.create({
    screenContainer: {
      alignItems: 'center',
      backgroundColor: themeColors.body,
      flex: 1,
      paddingTop: 60,
      width: width,
    },
    componentContent: {
      alignItems: 'center',
      marginBottom: 50,
      width: '100%'
    }
  });

  return (
    <Route exact={exact} path={path} render={props => (
      <View style={styles.screenContainer}>
        <Header noBack={noBack} />
        <View style={styles.componentContent}>
          <Component {...props} {...rest} fullWidth={width} />
        </View>
        <Footer />
      </View>
    )}
    />
  )
};
