import React, { useRef } from 'react';
import { View, Text, Button, Animated } from 'react-native';
import styled from 'styled-components/native';

const FadingBox = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  const BigSmallAnim = {
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 2, 1],
  };

  const fadeIn = () => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 0.5,
        duration: 200,
        // Easing: https://reactnative.dev/docs/easing
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Text>FadingBox</Text>
      <Box
        style={{
          opacity: animValue,
          transform: [
            {
              scale: animValue.interpolate(BigSmallAnim),
            },
          ],
        }}
      />
      <Button title="Show" onPress={fadeIn} />
      <Button title="Hide" onPress={fadeOut} />
    </View>
  );
};

const Box = styled(Animated.View)<{ opacity?: number }>`
  width: 100px;
  height: 100px;
  background-color: yellow;
`;

export default FadingBox;
