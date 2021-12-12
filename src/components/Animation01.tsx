/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Button, useWindowDimensions } from 'react-native';
import Animated, {
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
        translateX: withSpring(offset.value, config, () =>
          console.log('animation ran to completion'),
        ),
      },
    ],
  }));

  return (
    <View style={{ backgroundColor: '#ece' }}>
      <Button
        onPress={() => {
          const newOffsetValue =
            offset.value === 0 ? screenWidth - squareWidth : 0;
          offset.value = newOffsetValue;
          rerender({});
        }}
        title="Toggle"
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
