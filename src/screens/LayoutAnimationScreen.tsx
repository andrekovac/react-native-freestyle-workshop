import React from 'react';
import { ScrollView } from 'react-native';
import TouchingBall from '../components/TouchingBall';
import LayoutAnimationBox from '../components/LayoutAnimationBox';
import LayoutAnimationSimple from '../components/LayoutAnimationSimple';
import Title from '../components/Title';

const LayoutAnimationScreen = () => {
  return (
    <ScrollView>
      <Title>Simple Layout Animation</Title>
      <LayoutAnimationSimple />
      <Title>Layout Animations</Title>
      <TouchingBall />
      <Title>Layout Box Animation</Title>
      <LayoutAnimationBox />
    </ScrollView>
  );
};

export default LayoutAnimationScreen;
