import React, {RefObject} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useValue, withTimingTransition} from 'react-native-redash';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import TabHeader from './TabHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const {
  interpolateNode,
  Extrapolate,
  useCode,
  greaterThan,
  set,
  block,
} = Animated;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  title: {
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1,
    color: Platform.OS === 'android' ? '#ffffff' : null,
  },
});

export default ({y, tabs, scrollView}) => {
  const toggle = useValue(0);
  const insets = useSafeAreaInsets();
  const transition = withTimingTransition(toggle, {duration: 100});
  const {top: paddingTop} = insets;
  const translateX = interpolateNode(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateY = interpolateNode(y, {
    inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
      0,
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
    toggle,
    y,
  ]);
  return (
    <Animated.View style={[styles.container, {paddingTop}]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: Platform.OS === 'android' ? '#A5D6A7' : '#FFFFFF',
        }}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback>
          <View>
            <Feather name="arrow-left" size={ICON_SIZE} color="white" />
            <Animated.View
              style={{...StyleSheet.absoluteFillObject, opacity: transition}}>
              <Feather
                name="arrow-left"
                size={ICON_SIZE}
                color={Platform.OS === 'ios' ? 'black' : 'white'}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text
          style={[styles.title, {transform: [{translateX}, {translateY}]}]}>
          Miss Miu Europaallee
        </Animated.Text>
        <Feather name="heart" size={ICON_SIZE} color="white" />
      </View>
      <TabHeader {...{y, transition, tabs, scrollView}} />
    </Animated.View>
  );
};
