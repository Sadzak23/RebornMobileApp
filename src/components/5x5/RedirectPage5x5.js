import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Dashboard5x5 } from './Dashboard5x5';
import WeightsForm5x5 from './WeightsForm5x5';

const RedirectPage5x5 = ({ user }) => (
  <View style={{ flex: 1 }}>
    {user.workouts.strongLifts ?
      <Dashboard5x5 user={user} />
      :
      <WeightsForm5x5 user={user} />}
  </View>
);

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(RedirectPage5x5);