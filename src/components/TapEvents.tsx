import React from 'react';
import { StyleSheet } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  Layout,
  LightSpeedInLeft,
  LightSpeedInRight,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const TapEvents: React.VFC = () => {
  const pressed = useSharedValue(false);

  const pressedAnimValue = useDerivedValue(() => {
    return withSpring(pressed.value ? 1 : 0);
  });

  const color = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressedAnimValue.value,
      [0, 1],
      ['red', 'blue'],
    );
    const scale = interpolate(pressedAnimValue.value, [0, 1], [1, 2]);

    return {
      backgroundColor,
      transform: [{ scale }],
    };
  });

  return (
    <TapGestureHandler
      onBegan={() => {
        pressed.value = true;
      }}
      onEnded={() => {
        pressed.value = false;
      }}>
      <Animated.View
        style={[styles.ball, color]}
        entering={LightSpeedInRight.duration(400)}
        layout={Layout.springify()}>
        <Animated.Text entering={LightSpeedInLeft.duration(600)}>
          Tap Events
        </Animated.Text>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'yellow',

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TapEvents;
