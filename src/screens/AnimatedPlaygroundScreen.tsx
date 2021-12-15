import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import FadeAnimation from '../components/FadeAnimation';
import FadingBox from '../components/FadingBox';
import Title from '../components/Title';

const AnimatedPlaygroundScreen = () => {
  return (
    <ScrollView>
      <Title>Simple Fade-in Text</Title>
      <FadeAnimation />
      <Title>Fading Yellow Box</Title>
      <FadingBox />
    </ScrollView>
  );
};

export default AnimatedPlaygroundScreen;
