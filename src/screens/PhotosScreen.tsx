import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlatPhotoList from '../components/FlatPhotoList';
import { BottomTabNavigatorParamList } from '../navigation/BottomTabNavigator';
import { PhotosStackParamList } from '../navigation/PhotosStackNavigator';

export type PhotosScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PhotosStackParamList, 'PhotosScreen'>,
  BottomTabNavigationProp<BottomTabNavigatorParamList>
>;

type Photo = {
  id: string;
  author: string;
  download_url: string;
};

// custom hook hooks/usePhotos
const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        'https://picsum.photos/v2/list?page=7&limit=10',
      );
      const data = await response.json();
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  return photos;
};

const PhotosScreen: React.FC = () => {
  const photos = usePhotos();

  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, []);

  useFocusEffect(() => {
    console.log('focused screen');
    return () => {
      console.log('unfocused screen');
    };
  });

  // loading
  return (
    <SafeAreaView>
      <FlatPhotoList photos={photos} />
    </SafeAreaView>
  );
};

export default PhotosScreen;
