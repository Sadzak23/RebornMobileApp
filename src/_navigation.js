import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { themeColors } from './components/common/ColorMap';
import { Icon, ButtonIcon } from './components/common';
import WorkoutScreen from './components/WorkoutScreen';
import ProfileScreen from './components/ProfileScreen';
import Dashboard from './components/common/Dashboard'
import { TimerWorkout } from './components/TimerWorkout';

const Stack = createStackNavigator();
const Root = ({ user, onLogOut, id }) => {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: themeColors.header,
          },
          headerRight: () => (
            <ButtonIcon onPress={() => alert("Log out")} icon='logout' size={28} />
          ),
        }}
      >
        <Stack.Screen name="Home">
          {props => <Dashboard navigation={props.navigation} onLogOut={onLogOut} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Workouts" component={WorkoutScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" options={{ headerShown: false }}>
          {props => <TimerWorkout navigation={props.navigation} id="23" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

const Dash = createStackNavigator();
export const DashNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home">
        {props => <Dashboard navigation={props.navigation} />}
      </Stack.Screen>
      <Stack.Screen name="Workouts" component={WorkoutScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" options={{ headerShown: false }}>
        {props => <TimerWorkout navigation={props.navigation} id="23" />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

// const Stack = createStackNavigator();
// const Root = () => (
//   <NavigationNativeContainer>
//     <Stack.Navigator initialRouteName="Profile">
//       <Stack.Screen name="Home" component={Dashboard} />
//       <Stack.Screen name="Profile" component={TimerWorkout} />
//       <Stack.Screen name="Settings" component={FooterNavigation} />
//     </Stack.Navigator>
//   </NavigationNativeContainer>
// )

// const Tab = createMaterialBottomTabNavigator();
// export const FooterNavigation = () => (
//   <Tab.Navigator barStyle={{ backgroundColor: themeColors.header }}>
//     <Tab.Screen
//       name="Dasboard"
//       component={Dashboard}
//       options={{ tabBarIcon: ({ color }) => <Icon icon='home' color={color} size={28} /> }}
//     />
//     <Tab.Screen
//       name="Workouts"
//       component={TimerWorkout}
//       options={{
//         tabBarIcon: ({ color }) => <Icon icon='dumbbell' color={color} size={28} />
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{ tabBarIcon: ({ color }) => <Icon icon='account' color={color} size={28} /> }}
//     />
//   </Tab.Navigator>
// );

export default Root