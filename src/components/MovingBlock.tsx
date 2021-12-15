import React, { useState } from 'react';
import { Text, Button, useWindowDimensions } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

const MovingBlock = () => {
  // 1. shared value (i.e. the animated value)
  const offset = useSharedValue(0);

  // 2. Connect shared value(s) to style properties
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  // callback function
  const move = () => {
    // 3. update timing value with animation driver (here `withTiming`)
    const newOffsetValue = withTiming(
      Math.random() * (screenWidth - 50), // NB: Math.random assures that value is new every time
      { duration: 300 },
      () => console.log('animation ran to completion or got interrupted'),
    );
    offset.value = newOffsetValue;
    rerender({});
  };

  const cancel = () => {
    cancelAnimation(offset);
    rerender({});
  };

  const { width: screenWidth } = useWindowDimensions();
  // Trick to cause a re-render (in order to display shared value on screen)
  const [, rerender] = useState<object>();

  return (
    <>
      <ButtonWrapper>
        <Button onPress={move} title="Move Block" />
        <Button onPress={cancel} title="Cancel animation" />
      </ButtonWrapper>
      <Block style={animatedStyles} />
      <SharedValueUpdate value={offset.value / (screenWidth - 50)} />
    </>
  );
};

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const Block = styled(Animated.View)`
  width: 70px;
  height: 70px;
  background-color: red;
`;

const SharedValueUpdate: React.VFC<{ value: number }> = ({ value }) => (
  <ValueWrapper>
    <Text>Last shared value (not current one)</Text>
    <Text>{value}</Text>
  </ValueWrapper>
);

const ValueWrapper = styled.View`
  align-items: center;
  padding-vertical: 20px;
`;

export default MovingBlock;
