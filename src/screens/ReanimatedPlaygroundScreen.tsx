import React from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import AnimatedCards_useSpring from '../components/AnimatedCards_useSpring';
import MovingBlock from '../components/MovingBlock';
import TapEvents from '../components/TapEvents';
import Title from '../components/Title';

const RanimatedPlaygroundScreen = () => {
  return (
    <ScrollView>
      <Title>Moving Block (cancellable)</Title>
      <MovingBlock />
      <Title>Tap Events</Title>
      <Wrapper>
        <TapEvents />
      </Wrapper>
      <Title>Cards</Title>
      <Text>
        Compare both implementations: "components/AnimatedCards.tsx" and
        "components/AnimatedCards_useSpring.tsx"
      </Text>
      <Wrapper>
        <AnimatedCards_useSpring />
      </Wrapper>
    </ScrollView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
`;

export default RanimatedPlaygroundScreen;
