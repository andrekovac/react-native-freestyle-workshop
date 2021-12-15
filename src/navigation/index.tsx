import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ModalScreen from '../screens/ModalScreen';

const RootStack = createNativeStackNavigator();

export type RootStackParamList = {
  Tabs: undefined;
  Home: undefined;
  Details: undefined;
  ModalScreen: undefined;
};

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name="Tabs"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}>
        <RootStack.Screen name="ModalScreen" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
