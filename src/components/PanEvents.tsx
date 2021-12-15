import React from 'react';
import { Text, StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';

const PanEvents: React.VFC = () => {
  const pressed = useSharedValue(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const { width, height } = useWindowDimensions();

  const color = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? 'red' : 'blue',
    transform: [
      {
        translateX: x.value,
      },
      { translateY: y.value },
    ],
  }));

  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { xOffset: number; yOffset: number }
  >({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.xOffset = x.value;
      ctx.yOffset = y.value;
    },
    onActive: (event, ctx) => {
      x.value = event.translationX + ctx.xOffset;
      y.value = event.translationY + ctx.yOffset;
    },
    onEnd: (event, ctx) => {
      console.log({ width, height, x: event.absoluteX, y: event.absoluteY });
      pressed.value = false;
      // ctx.xOffset = event.absoluteX;
      // ctx.yOffset = event.absoluteY;
      x.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, width - 100],
      });
      y.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, height - 100],
      });
    },
  });

  return (
    <View style={{ borderColor: 'black' }}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, color]}>
          <Text>Pan Events</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
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

export default PanEvents;
