import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Photo } from '../components/FlatPhotoList';
import PhotosDetailsScreen from '../screens/PhotosDetailsScreen';
import PhotosScreen from '../screens/PhotosScreen';

const Stack = createNativeStackNavigator();

export type PhotosStackParamList = {
  PhotosScreen: undefined;
  PhotosDetails: { item: Photo };
};

const PhotosStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PhotosScreen"
        component={PhotosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PhotosDetails" component={PhotosDetailsScreen} />
    </Stack.Navigator>
  );
};

export default PhotosStackNavigator;
