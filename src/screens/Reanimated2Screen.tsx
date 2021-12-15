import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import TapEvents from '../components/TapEvents';
import { RootStackParamList } from '../navigation';

type Reanimated2ScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'ModalScreen'
>;

const Reanimated2Screen: React.FC<Reanimated2ScreenProps> = ({
  navigation,
}) => {
  return (
    <ScreenWrapper>
      <TapEvents />
      <Button
        onPress={() => navigation.navigate('ModalScreen')}
        title="Open Modal"
      />
      <Button
        onPress={() =>
          // @ts-ignore
          navigation.navigate('PhotosNavigator', {
            screen: 'PhotosDetails',
            params: { item: { id: 23123, author: 'Jamie' } },
          })
        }
        title="Go to user Jamie"
      />
    </ScreenWrapper>
  );
};

const ScreenWrapper = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export default Reanimated2Screen;
