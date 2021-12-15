import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlatPhotoList from '../components/FlatPhotoList';
import usePhotos from '../hooks/usePhotos';
import { BottomTabNavigatorParamList } from '../navigation/BottomTabNavigator';
import { PhotosStackParamList } from '../navigation/PhotosStackNavigator';

export type PhotosScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PhotosStackParamList, 'PhotosScreen'>,
  BottomTabNavigationProp<BottomTabNavigatorParamList>
>;

const PhotosScreen: React.FC = () => {
  const photos = usePhotos();

  useEffect(() => {
    console.log(
      '[PhotosScreen] screen mounts and will stay mounted while you visit PhotosDetails',
    );
    return () => {
      console.log(
        '[PhotosScreen] screen does not unmount unless tab navigation is popped from RootStack.',
      );
    };
  }, []);

  // useFocusEffect is called on every render when the screen is in focus
  // useCallback causes it to be only called when focused/unfocused
  useFocusEffect(
    useCallback(() => {
      console.log('[PhotosScreen] focused');
      return () => {
        console.log('[PhotosScreen] unfocused');
      };
    }, []),
  );

  // loading
  return (
    <SafeAreaView>
      <FlatPhotoList photos={photos} />
    </SafeAreaView>
  );
};

export default PhotosScreen;
