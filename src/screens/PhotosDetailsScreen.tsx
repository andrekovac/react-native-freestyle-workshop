import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, Button } from 'react-native';
import { PhotosStackParamList } from '../navigation/PhotosStackNavigator';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';

type PhotosScreenProps = NativeStackScreenProps<
  PhotosStackParamList,
  'PhotosDetails'
>;

const PhotosDetailsScreen: React.FC<PhotosScreenProps> = ({
  route,
  navigation,
}) => {
  const { item } = route.params;

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('[PhotosDetailsScreen] mounts');
    return () => {
      console.log(
        '[PhotosDetailsScreen] unmounts when going back to PhotosScreen.',
      );
    };
  }, []);

  // useFocusEffect is called on every render when the screen is in focus
  // useCallback causes it to be only called when focused/unfocused
  useFocusEffect(
    useCallback(() => {
      console.log('[PhotosDetailsScreen] focused');
      return () => {
        console.log('[PhotosDetailsScreen] unfocused');
      };
    }, []),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>{count}</Text>,
      headerLeft: () => (
        <CustomBackText onPress={() => navigation.goBack()}>
          Return
        </CustomBackText>
      ),
      title: item.author,
    });
  }, [navigation, count, item]);

  return (
    <Wrapper>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Button title="increment" onPress={() => setCount(c => c + 1)} />
    </Wrapper>
  );
};

const CustomBackText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: red;
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default PhotosDetailsScreen;
