import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import LayoutAnimationScreen from '../screens/LayoutAnimationScreen';
import RanimatedPlaygroundScreen from '../screens/RanimatedPlaygroundScreen';
import Reanimated2Screen from '../screens/Reanimated2Screen';
import PhotosStackNavigator from './PhotosStackNavigator';

const Tab = createBottomTabNavigator();

export type BottomTabNavigatorParamList = {
  Photos: undefined;
  LayoutAnimation: undefined;
  Reanimated2: undefined;
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
          //
          return {
            // headerShown: false,
            headerTitle: getHeaderTitle(route),
            // headerShown: routeName !== 'PhotosDetails',
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
        options={{ tabBarBadge: 3, headerTitle: 'Layout Animation' }}
      />
      <Tab.Screen
        name="RanimatedPlayground"
        component={RanimatedPlaygroundScreen}
      />
      <Tab.Screen name="Reanmiated2" component={Reanimated2Screen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
