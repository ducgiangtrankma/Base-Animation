import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useDerivedValue,
} from 'react-native-reanimated';
const AnimatedCard = ({x, avatarUri}) => {
  const v = useDerivedValue(() => {
    return interpolate(x.value, [0, 120], [0, 1], Extrapolate.CLAMP);
  });

  const containerStyle = useAnimatedStyle(() => {
    const width = interpolate(v.value, [0, 1], [120, 60], Extrapolate.CLAMP);
    const marginLeft = interpolate(v.value, [0, 1], [4, 0], Extrapolate.CLAMP);
    const borderLeftRadius = interpolate(
      v.value,
      [0, 1],
      [12, 0],
      Extrapolate.CLAMP,
    );
    const borderRightRadius = interpolate(
      v.value,
      [0, 1],
      [12, 30],
      Extrapolate.CLAMP,
    );
    const height = interpolate(v.value, [0, 1], [200, 60], Extrapolate.CLAMP);
    const top = interpolate(v.value, [0, 1], [20, 100], Extrapolate.CLAMP);

    return {
      width,
      height,
      overflow: 'hidden',
      borderTopLeftRadius: borderLeftRadius,
      borderBottomLeftRadius: borderLeftRadius,
      borderTopRightRadius: borderRightRadius,
      borderBottomRightRadius: borderRightRadius,
      marginLeft,
      marginRight: 4,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'grey',
      position: 'absolute',
      left: 0,
      top,
      backgroundColor: 'white',
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const size = interpolate(v.value, [0, 1], [120, 40], Extrapolate.CLAMP);
    const borderRadius = interpolate(
      v.value,
      [0, 1],
      [0, 20],
      Extrapolate.CLAMP,
    );
    const tx = interpolate(v.value, [0, 1], [0, 10], Extrapolate.CLAMP);
    const ty = interpolate(v.value, [0, 1], [0, 10], Extrapolate.CLAMP);

    return {
      width: size,
      height: size,
      borderRadius,
      transform: [{translateX: tx}, {translateY: ty}],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const top = interpolate(v.value, [0, 1], [100, 35], Extrapolate.CLAMP);
    const left = interpolate(v.value, [0, 1], [40, 35], Extrapolate.CLAMP);
    const size = interpolate(v.value, [0, 1], [40, 16], Extrapolate.CLAMP);
    const borderWidth = interpolate(v.value, [0, 1], [2, 0], Extrapolate.CLAMP);

    return {
      backgroundColor: '#3f3fef',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 20,
      borderWidth,
      borderColor: 'white',
      position: 'absolute',
      top,
      left,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(v.value, [0, 0.5], [1, 0], Extrapolate.CLAMP);
    return {
      textAlign: 'center',
      marginTop: 30,
      opacity,
    };
  });
  return (
    <Animated.View style={containerStyle}>
      <Animated.Image source={{uri: avatarUri}} style={imageStyle} />
      <Animated.View style={iconStyle}>
        <Icon name="plus" color="white" size={18} />
      </Animated.View>
      <Animated.Text style={textStyle}>Create a story</Animated.Text>
    </Animated.View>
  );
};
export default React.memo(AnimatedCard);
