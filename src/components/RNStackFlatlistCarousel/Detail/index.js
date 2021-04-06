/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};
const DURATION = 400;
const DELAY = 300;
const SPACING = 10;
const Detail = ({route, navigation}) => {
  const {item} = route?.params;
  return (
    <View style={{flex: 1}}>
      <SharedElement
        id={`item.${item.key}.image`}
        style={StyleSheet.absoluteFillObject}>
        <Image
          source={{uri: item.poster}}
          style={StyleSheet.absoluteFillObject}
        />
      </SharedElement>
      <Animatable.View
        duration={DURATION * 1.5}
        DELAY={DELAY}
        animation="fadeIn"
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: 'rgba(0,0,0,0.3)'},
        ]}
      />
      <AntDesign
        name="close"
        onPress={() => {
          navigation.goBack();
        }}
        size={28}
        style={{
          padding: SPACING,
          position: 'absolute',
          top: SPACING,
          right: SPACING,
          zIndex: 2,
          color: '#ffffff',
        }}
      />
      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          {transform: [{translateY: Dimensions.get('screen').height}]},
        ]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: '#ffff',
              transform: [{translateY: -Dimensions.get('screen').height * 0.3}],
              padding: SPACING * 2,
              borderRadius: 16,
            },
          ]}>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 100}
            style={{fontSize: 28, fontWeight: '900'}}>
            {item.title}
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 200}
            style={{fontWeight: '500', fontSize: 16}}>
            {item.location}
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DELAY + 400}
            style={{fontSize: 12}}>
            {item.date}
          </Animatable.Text>
        </View>
      </SharedElement>
    </View>
  );
};
Detail.sharedElements = (route) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.image`,
    },
  ];
};
export default Detail;
