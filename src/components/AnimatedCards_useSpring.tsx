import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ColorValue, Button } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const bgColors = ['red', 'green', 'blue'];

const useSpring = (open: boolean) => {
  const sav = useSharedValue(0);

  useEffect(() => {
    sav.value = open ? 1 : 0;
    console.log('change value', sav.value);
  }, [open, sav]);

  return useDerivedValue(() => withSpring(sav.value));
};

const AnimatedCards_useSpring: React.VFC = () => {
  const [open, setOpen] = useState(false);

  const transition = useSpring(open);

  return (
    <>
      <View style={styles.cardsWrapper}>
        {bgColors.map((color, index) => (
          <Card key={color} {...{ index, color, transition }} />
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
  transition: Readonly<SharedValue<number>>;
};

const Card: React.VFC<CardProps> = ({ index, color, transition }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: (index - 1) * transition.value * CARD_Y_TRANSLATION,
        },
        {
          rotate: `${(index - 1) * transition.value * CARD_ANGLE}deg`,
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

export default AnimatedCards_useSpring;
