import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
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

  const [swipes, setSwipes] = useState({ left: 0, right: 0 });

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

  const handleSwipeEnd = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setSwipes({
        ...swipes,
        left: swipes.left + 1,
      });
    } else {
      setSwipes({
        ...swipes,
        right: swipes.right + 1,
      });
    }
  };

  return (
    <SafeAreaView>
      <SwipeCounts>
        <TextBold>Total Swipes</TextBold>
        <Text>{`Right: ${swipes.right}, Left: ${swipes.left}`}</Text>
      </SwipeCounts>
      <FlatPhotoList photos={photos} onSwipeEnd={handleSwipeEnd} />
    </SafeAreaView>
  );
};

const TextBold = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const SwipeCounts = styled.View`
  padding: 10px;
  margin: 20px;
  background-color: #90beed;
`;

export default PhotosScreen;
