/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Button, useWindowDimensions } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Progress from 'react-native-progress';

const squareWidth = 70;

const config = {
  damping: 10,
};

const Animation01 = () => {
  const { width: screenWidth } = useWindowDimensions();
  // Trick to cause a re-render
  const [, rerender] = useState<object>();

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(offset.value, config, finished =>
          finished
            ? console.log('animation ran to completion')
            : console.log('animation got interrupted / cancelled'),
        ),
      },
    ],
  }));

  return (
    <View style={{ backgroundColor: '#ece' }}>
      <Button
        onPress={() => {
          // Note: calling withSpring here causes animation to not be properly interruptible
          // in this example because value only alternates between two values.
          // See https://github.com/software-mansion/react-native-reanimated/issues/2733
          offset.value = offset.value === 0 ? screenWidth - squareWidth : 0;
          rerender({});
        }}
        title="Toggle"
      />
      <Button
        onPress={() => {
          cancelAnimation(offset);
          rerender({});
        }}
        title="Cancel animation"
      />
      <Animated.View
        style={[
          {
            width: squareWidth,
            height: squareWidth,
            backgroundColor: 'red',
          },
          animatedStyles,
        ]}
      />
      <ProgressBar value={offset.value} width={screenWidth - 50} />
    </View>
  );
};

type ProgressBarProps = {
  value: number;
  width: number;
};
const ProgressBar: React.VFC<ProgressBarProps> = ({ value, width }) => (
  <View style={{ alignItems: 'center', paddingVertical: 20 }}>
    <Text>Shared Value: {value}</Text>
    <Progress.Bar progress={value} width={width} />
  </View>
);

export default Animation01;
