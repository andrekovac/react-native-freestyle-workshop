/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Button } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const RanimatedPlaygroundScreen = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  const handlePress = () => {
    // Math.random assures that value is new every time
    const newOffsetValue = withTiming(
      Math.random() * 200,
      { duration: 200 },
      () => console.log('animation ran to completion or got interrupted'),
    );
    offset.value = newOffsetValue;
  };

  return (
    <View style={{ backgroundColor: '#ece' }}>
      <Button onPress={handlePress} title="Toggle" />
      <Animated.View
        style={[
          {
            width: 70,
            height: 70,
            backgroundColor: 'red',
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

export default RanimatedPlaygroundScreen;
