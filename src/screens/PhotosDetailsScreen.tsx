import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { PhotosStackParamList } from '../navigation/PhotosStackNavigator';
import YouTube from '../components/Youtube';

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>{count}</Text>,
      headerLeft: () => (
        <Text onPress={() => navigation.goBack()}>zurueck</Text>
      ),
      title: item.author,
    });
  }, [navigation, count, item]);

  return (
    <View>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Text>{item.author}</Text>
      <Button title="increment count" onPress={() => setCount(c => c + 1)} />
    </View>
  );
};

export default PhotosDetailsScreen;
