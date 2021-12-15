import React, { useState } from 'react';
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LayoutAnimationBox = () => {
  const [boxPosition, setBoxPosition] = useState('left');
  const [show, setShow] = useState(true);

  const toggleBox = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.scaleXY,
      ),
    );
    setBoxPosition(boxPosition === 'left' ? 'right' : 'left');
  };

  const toggleShow = () => {
    const opacityAnimation = {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.scaleY,
        springDamping: 1,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    };

    LayoutAnimation.configureNext(opacityAnimation);
    setShow(!show);
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Layout" onPress={toggleBox} />
        <Button title="Show Box" onPress={toggleShow} />
      </View>
      {show && (
        <View
          style={[styles.box, boxPosition === 'left' ? null : styles.moveRight]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: 'blue',
  },
  moveRight: {
    alignSelf: 'flex-end',
    height: 200,
    width: 200,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default LayoutAnimationBox;
