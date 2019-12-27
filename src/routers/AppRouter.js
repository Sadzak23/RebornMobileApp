import React from 'react';
import { StatusBar } from 'react-native';
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
import Play from '../components/Play';

const AppRouter = () => {
  return (
    <NativeRouter>
      <StatusBar backgroundColor={themeColors.header} animated />
      <Switch>
        <DashboardRoute exact path="/" component={HomeScreen} noBack />
        <DashboardRoute path="/workouts" component={WorkoutsScreen} />
        <DashboardRoute path="/settings" component={SettingsScreen} />

        <DashboardRoute path="/profile" component={ProfileScreen} />
        <DashboardRoute path="/user-form" component={UserForm} />
        {/* Timers */}
        <FullScreenRoute path="/workout-timer/:id" component={Timer} />
        <FullScreenRoute path="/timer-test" component={TimerTest} />
        <DashboardRoute path="/timers-list" component={TimersList} />
        {/* 5x5 */}
        <FullScreenRoute path="/workout-5x5" component={Workout5x5} />
        {/* Playground */}
        <DashboardRoute path="/play" component={Play} />
      </Switch>
    </NativeRouter>
  )
};

export default AppRouter;