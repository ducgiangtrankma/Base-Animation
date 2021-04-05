import React, {Component} from 'react';
import {Animated, Image, View, Text, StyleSheet} from 'react-native';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
export default function Item({item, index, scale, opacity}) {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{scale}],
          opacity,
        },
      ]}>
      <Image
        source={{uri: item.profile_image}}
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: 9999,
          marginRight: SPACING / 2,
        }}
      />
      <View>
        <Text style={{fontSize: 22, fontWeight: '700'}}>
          {item.display_name}
        </Text>
        <Text style={{fontSize: 18, opacity: 0.7}}>{index}</Text>
        <Text style={{fontSize: 16, opacity: 0.5}}>{item.location}</Text>
      </View>
    </Animated.View>
  );
}
export {SPACING, ITEM_SIZE, AVATAR_SIZE};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
