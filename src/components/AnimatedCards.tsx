import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ColorValue, Button } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const bgColors = ['red', 'green', 'blue'];

/**
 * Cards that spring apart
 */
const AnimatedCards: React.VFC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.cardsWrapper}>
        {bgColors.map((color, index) => (
          <Card key={color} {...{ index, color, open }} />
        ))}
      </View>
      <Button title={open ? 'Close' : 'Open'} onPress={() => setOpen(!open)} />
    </>
  );
};

const CARD_ANGLE = 15;
const CARD_Y_TRANSLATION = 100;

type CardProps = {
  index: number;
  color: ColorValue;
  open: boolean;
};

/**
 * Card holds shared value + style
 *
 * The `useSpring` hook in the other implementation makes for a
 * nicer separation of concerns.
 */
const Card: React.VFC<CardProps> = ({ index, color, open }) => {
  const sav = useSharedValue(0);

  useEffect(() => {
    sav.value = open ? 1 : 0;
    console.log('change value', sav.value);
  }, [open, sav]);

  const animatedStyle = useAnimatedStyle(() => {
    const angle = interpolate(sav.value, [0, 1], [0, CARD_ANGLE]);
    const yTranslation = interpolate(
      sav.value,
      [0, 1],
      [0, CARD_Y_TRANSLATION],
    );

    return {
      transform: [
        {
          translateY: withSpring(
            open ? -1 * index * yTranslation + CARD_Y_TRANSLATION : 0,
          ),
        },
        {
          rotate: withSpring(
            open ? `${-1 * index * angle + CARD_ANGLE}deg` : '0deg',
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.card, { backgroundColor: color }, animatedStyle]}>
      <Text style={styles.cardText}>Card {index}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    // layout
    width: 300,
    height: 150,
    borderRadius: 15,

    // children allignment
    alignItems: 'center',
    justifyContent: 'center',

    // rotation
    position: 'absolute',
  },
  cardText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardsWrapper: {
    width: 300,
    height: 150,
    marginVertical: 50,
  },
});

export default AnimatedCards;
