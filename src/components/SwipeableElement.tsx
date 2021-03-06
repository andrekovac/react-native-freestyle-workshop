import React from 'react';
import { useWindowDimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const springConfig = {
  // check https://reactnative.dev/docs/animated#spring
  damping: 15,
  tension: 40,
  mass: 1,
  stiffness: 90,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
  overshootClamping: false,
};

interface SwipeableElementT {
  children: React.ReactElement;
  threshold?: number;
  onSwipeEndOverThreshold?: (direction: 'right' | 'left') => void;
}
const SwipeableElement = ({
  children,
  threshold,
  onSwipeEndOverThreshold,
}: SwipeableElementT) => {
  const { width } = useWindowDimensions();

  const thresholdInternal = threshold ?? width;

  // shared value holding current translation
  const translateX = useSharedValue(0);

  // create event-handler for the respective gesture states
  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      // if we start the gesture again while the element is not yet back to 0, we store the current offset
      ctx.x = translateX.value;
    },
    onActive: (event, ctx) => {
      // apply the offset if gesture got interupted and started again while not yet back at 0
      translateX.value = ctx.x + event.translationX;
    },
    onEnd: () => {
      if (translateX.value > thresholdInternal) {
        // execute callback `onSwipeEndOverThreshold` with `"right"` as argument
        onSwipeEndOverThreshold && runOnJS(onSwipeEndOverThreshold)('right');
      } else if (translateX.value < -thresholdInternal) {
        onSwipeEndOverThreshold && runOnJS(onSwipeEndOverThreshold)('left');
      }
      // the next line triggers the actual animation of the component including `translateX` in its style declaration
      // see: https://docs.swmansion.com/react-native-reanimated/docs/animations#customizing-animations for more examples and links to the API
      // translateX.value = 0;
      // translateX.value = withTiming(0);
      translateX.value = withSpring(0, springConfig);
    },
  });

  // compute animated style based on the current value of the transition;
  // "static" styles should be declared via the standard StyleSheet-API
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        {
          rotate: `${interpolate(
            translateX.value, // input value
            [-thresholdInternal * 2, 0, thresholdInternal * 2], // input range
            [-10, 0, 10], // output range
            Extrapolate.CLAMP, // handling of input value outside input range
          )}deg`,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panHandler} activeOffsetX={[-5, 5]}>
      <Animated.View style={containerStyle}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default SwipeableElement;
