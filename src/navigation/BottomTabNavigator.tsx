import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import AnimatedPlaygroundScreen from '../screens/AnimatedPlaygroundScreen';
import LayoutAnimationScreen from '../screens/LayoutAnimationScreen';
import ReanimatedPlaygroundScreen from '../screens/ReanimatedPlaygroundScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PhotosStackNavigator from './PhotosStackNavigator';

const Tab = createBottomTabNavigator();

export type BottomTabNavigatorParamList = {
  Photos: undefined;
  LayoutAnimation: undefined;
  AnimatedPlayground: undefined;
  ReanimatedPlayground: undefined;
  Settings: undefined;
};

const getHeaderTitle = (route: any) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'PhotosScreen';

  switch (routeName) {
    case 'PhotosScreen':
      return 'Photos';
    case 'PhotosDetails':
      return 'Details';
  }
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PhotosNavigator"
        component={PhotosStackNavigator}
        options={({ route, navigation }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'PhotosScreen';

          return {
            title: 'Photos',
            headerShown: false,
            // NB: This is overwritten by headerLeft inside PhotosDetails screen
            headerLeft: () =>
              routeName === 'PhotosDetails' && (
                <Text onPress={() => navigation.goBack()}>Go back</Text>
              ),
          };
        }}
      />
      <Tab.Screen
        name="LayoutAnimation"
        component={LayoutAnimationScreen}
        options={{ tabBarBadge: 3, title: 'Layout Animation' }}
      />
      <Tab.Screen
        name="AnimatedPlayground"
        component={AnimatedPlaygroundScreen}
        options={{ title: 'Animated' }}
      />
      <Tab.Screen
        name="ReanimatedPlayground"
        component={ReanimatedPlaygroundScreen}
        options={{ title: 'Reanimated 2' }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
