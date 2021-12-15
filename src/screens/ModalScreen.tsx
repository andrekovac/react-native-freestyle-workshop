import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import AnimatedCards from '../components/AnimatedCards';
import { RootStackParamList } from '../navigation';

type ModalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ModalScreen'
>;

const ModalScreen: React.FC<ModalScreenProps> = ({ navigation }) => {
  return (
    <ModalWrapper>
      <CardsWrapper>
        <AnimatedCards />
      </CardsWrapper>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </ModalWrapper>
  );
};

const ModalWrapper = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const CardsWrapper = styled.View`
  margin-vertical: 100px;
`;

export default gestureHandlerRootHOC(ModalScreen);
