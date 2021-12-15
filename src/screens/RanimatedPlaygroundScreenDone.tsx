/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Button, useWindowDimensions } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Progress from 'react-native-progress';

const squareWidth = 70;

const RanimatedPlaygroundScreen = () => {
  const { width: screenWidth } = useWindowDimensions();
  // Trick to cause a re-render
  const [, rerender] = useState<object>();

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  return (
    <View style={{ backgroundColor: '#ece' }}>
      <Button
        onPress={() => {
          // Math.random assures that value is new every time
          const newOffsetValue = withTiming(
            Math.random() * 200,
            { duration: 200 },
            () => console.log('animation ran to completion or got interrupted'),
          );
          offset.value = newOffsetValue;
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

export default RanimatedPlaygroundScreen;
