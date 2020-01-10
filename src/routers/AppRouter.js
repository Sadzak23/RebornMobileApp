import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { NativeRouter, Switch } from "react-router-native";
import { DashboardRoute } from './DashboardRoute';
import { FullScreenRoute } from './FullScreenRoute';
import { themeColors } from '../components/common/ColorMap';
//import { TimerWorkout } from '../components/TimerWorkout/TimerWorkout';
import { WorkoutsScreen } from '../components/WorkoutsScreen';
import ProfileScreen from '../components/ProfileScreen';
import HomeScreen from '../components/HomeScreen';
import { Workout5x5 } from '../components/5x5/Workout5x5';
import { TimersList } from '../components/TimerWorkout/TimersList';
import { Timer } from '../components/TimerWorkout/Timer';
import { TimerTest } from '../components/TimerWorkout/TimerTest';
import { SettingsScreen } from '../components/SettingsScreen';
import UserForm from '../components/User/UserForm';
import CalCalculator from '../components/Calculators/CalCalculator/CalCalculator';
import WeightsForm5x5 from '../components/5x5/WeightsForm5x5';

const AppRouter = () => {
  const [fullWidth, setFullWidth] = useState(Dimensions.get('window').width)
  useEffect(() => {
    Dimensions.addEventListener('change', () => { setFullWidth(Dimensions.get('window').width) })
    return Dimensions.removeEventListener('change', () => { setFullWidth(Dimensions.get('window').width) })
  }, []);
  return (
    <NativeRouter>
      <StatusBar backgroundColor={themeColors.header} animated />
      <Switch>
        <DashboardRoute exact path="/" component={HomeScreen} fullWidth={fullWidth} noBack />
        <DashboardRoute path="/workouts" component={WorkoutsScreen} fullWidth={fullWidth} />
        <DashboardRoute path="/settings" component={SettingsScreen} fullWidth={fullWidth} />
        {/* User */}
        <DashboardRoute path="/profile" component={ProfileScreen} fullWidth={fullWidth} />
        <DashboardRoute path="/user-form" component={UserForm} fullWidth={fullWidth} />
        {/* Timers */}
        <FullScreenRoute path="/workout-timer/:id" component={Timer} fullWidth={fullWidth} />
        <FullScreenRoute path="/timer-test" component={TimerTest} fullWidth={fullWidth} />
        <DashboardRoute path="/timers-list" component={TimersList} fullWidth={fullWidth} />
        {/* 5x5 */}
        <FullScreenRoute path="/workout-5x5" component={Workout5x5} fullWidth={fullWidth} />
        <FullScreenRoute path="/weights-form5x5" component={WeightsForm5x5} fullWidth={fullWidth} />
        {/* Calculator */}
        <DashboardRoute path="/calorie-calculator" component={CalCalculator} fullWidth={fullWidth} />
      </Switch>
    </NativeRouter>
  )
};

export default AppRouter;