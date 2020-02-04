import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { NativeRouter, Switch } from 'react-router-native';
import { DashboardRoute } from './DashboardRoute';
import { FullScreenRoute, StrongLiftRoute } from './FullScreenRoute';
import { themeColors } from '../components/common/ColorMap';
import { TimerWorkout } from '../components/TimerWorkout/TimerWorkout';
import { WorkoutsScreen } from '../components/WorkoutsScreen';
import ProfileScreen from '../components/ProfileScreen';
import HomeScreen from '../components/HomeScreen';
import Workout5x5 from '../components/5x5/Workout5x5';
import RedirectPage5x5 from '../components/5x5/RedirectPage5x5';
import { TimersList } from '../components/TimerWorkout/TimersList';
import { SettingsScreen } from '../components/SettingsScreen';
import UserForm from '../components/User/UserForm';
import Play from '../../1play/Play';
import CalCalculator from '../components/Calculators/CalCalculator/CalCalculator';
import WeightsForm5x5 from '../components/5x5/WeightsForm5x5';
import HeartRate from '../components/HeartRate/hr';
import SearchBLE from '../components/HeartRate/SearchBLE';

const AppRouter = ({ onLogout }) => {
  const [fullWidth, setFullWidth] = useState(Dimensions.get('window').width)
  useEffect(() => {
    Dimensions.addEventListener('change', () => { setFullWidth(Dimensions.get('window').width) })
    return Dimensions.removeEventListener('change', () => { setFullWidth(Dimensions.get('window').width) })
  }, []);
  return (
    <NativeRouter>
      <StatusBar backgroundColor={themeColors.header} animated />
      <Switch>
        <DashboardRoute exact path='/' component={HomeScreen} fullWidth={fullWidth} noBack title='Home' />
        <DashboardRoute path='/workouts' component={WorkoutsScreen} fullWidth={fullWidth} noBack title='Select workout' />
        <DashboardRoute path='/profile' component={ProfileScreen} fullWidth={fullWidth} noBack title='Profile' />
        <DashboardRoute path='/settings' component={SettingsScreen} fullWidth={fullWidth} onLogout={onLogout} title='Settings' />
        {/* Playground */}
        <DashboardRoute path='/play' component={HeartRate} fullWidth={fullWidth} />
        {/* User */}
        <FullScreenRoute path='/user-form' component={UserForm} fullWidth={fullWidth} />
        {/* Timers */}
        <DashboardRoute path='/timers-list' component={TimersList} fullWidth={fullWidth} title='Timers' />
        <FullScreenRoute path='/workout-timer/:id' component={TimerWorkout} fullWidth={fullWidth} />
        {/* 5x5 */}
        <StrongLiftRoute path='/dashboard-5x5' component={RedirectPage5x5} fullWidth={fullWidth} />
        <StrongLiftRoute path='/weights-form5x5' component={WeightsForm5x5} fullWidth={fullWidth} />
        <StrongLiftRoute path='/workout-5x5' component={Workout5x5} fullWidth={fullWidth} />        
        {/* HR */}
        <DashboardRoute path='/search-hrm' component={SearchBLE} fullWidth={fullWidth} title='Pair new device' />
        {/* Calculator */}
        <DashboardRoute path='/calorie-calculator' component={CalCalculator} fullWidth={fullWidth} title='Calories Calculator' />
      </Switch>
    </NativeRouter>
  )
};

export default AppRouter;