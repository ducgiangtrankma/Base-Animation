import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
const {Extrapolate, interpolateNode} = Animated;
const {height: wHeight, width: wWidth} = Dimensions.get('window');
export const backgroundImage = require('./assets/background.jpeg');
export const HEADER_IMAGE_HEIGHT = wHeight / 3;
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: 'cover',
  },
});

export default ({y}) => {
  const height = interpolateNode(y, {
    inputRange: [-100, 0],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const top = interpolateNode(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });
  return (
    <Animated.Image
      source={backgroundImage}
      style={[styles.image, {top, height}]}
    />
  );
};
