import React from 'react';
import styled from 'styled-components/native';
import {
  ListRenderItem,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import SwipeableElement from './SwipeableElement';
import { useNavigation } from '@react-navigation/native';
import { PhotosScreenNavigationProp } from '../screens/PhotosScreen';

type Photo = {
  id: string;
  author: string;
  download_url: string;
};

type ItemElementProps = {
  item: Photo;
  onSwipeEnd?: (direction: 'left' | 'right') => void;
};

const ItemElement: React.FC<ItemElementProps> = ({ item, onSwipeEnd }) => {
  const { width } = useWindowDimensions();
  const itemWidth = width - 40;

  const navigation = useNavigation<PhotosScreenNavigationProp>();

  return (
    <SwipeableElement
      threshold={itemWidth / 3}
      onSwipeEndOverThreshold={onSwipeEnd}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PhotosDetails', { item })}>
        <ItemWrapper style={{ width: itemWidth }}>
          <ItemImage source={{ uri: item.download_url }} />
          <ItemText>{item.author}</ItemText>
        </ItemWrapper>
      </TouchableOpacity>
    </SwipeableElement>
  );
};

const FlatPhotoList: React.VFC<{
  onSwipeEnd?: (direction: 'left' | 'right') => void;
  photos: Photo[];
}> = ({ onSwipeEnd, photos }) => {
  const renderItem: ListRenderItem<Photo> = ({ item }) => (
    <ItemElement item={item} onSwipeEnd={onSwipeEnd} />
  );

  return (
    <List
      data={photos}
      // @ts-ignore
      renderItem={renderItem}
      // @ts-ignore
      keyExtractor={item => item.id}
    />
  );
};

const List = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  width: 100%;
`;

const ItemText = styled.Text`
  position: absolute;
  color: white;
  font-size: 18px;
  background-color: #323;
  padding: 10px;
`;

const ItemWrapper = styled.View`
  margin: 10px 0;
`;

const ItemImage = styled.Image`
  aspect-ratio: 1;
`;

export default FlatPhotoList;
