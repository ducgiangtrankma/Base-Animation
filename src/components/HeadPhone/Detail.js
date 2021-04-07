/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SharedElement} from 'react-navigation-shared-element';
const {width, height} = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';
const SPACING = 10;
const DURATION = 300;
const letterAnimation = {
  0: {
    opacity: 0,
    translateY: -42,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};
const animation = {
  0: {
    translateX: width,
  },
  1: {
    translateX: 0,
  },
};
const PlayIcon = () => <AntDesign name="playcircleo" size={18} color="black" />;
const DetailHeadPhone = ({navigation, route}) => {
  const circleSize = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
  const {item} = route?.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <AntDesign
        name="close"
        size={28}
        style={{
          position: 'absolute',
          padding: 12,
          top: SPACING * 2,
          right: 20,
          zIndex: 2,
        }}
        color="#3333"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SharedElement
        id={`item.${item.key}.circle`}
        style={[
          StyleSheet.absoluteFillObject,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <View
          style={{
            position: 'absolute',
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize,
            opacity: 0.2,
            backgroundColor: item.color,
          }}
        />
      </SharedElement>
      <SharedElement id={`item.${item.key}.image`} style={styles.circle}>
        <Image source={item.imageUri} style={styles.image} />
      </SharedElement>

      <View style={{position: 'absolute', top: SPACING * 4, left: SPACING}}>
        <View style={{flexDirection: 'row', overflow: 'hidden', height: 42}}>
          {item.type.split('').map((letter, index) => {
            return (
              <Animatable.Text
                useNativeDriver
                animation={letterAnimation}
                delay={DURATION + index * 50}
                key={`${letter}-${index}`}
                style={styles.heading}>
                {letter}
              </Animatable.Text>
            );
          })}
        </View>
        <View style={{overflow: 'hidden'}}>
          <Animatable.Text
            useNativeDriver
            animation={letterAnimation}
            delay={DURATION + item.type.split('').length * 50 + 50}
            style={{
              fontSize: 20,
              fontWeight: '800',
              textTransform: 'uppercase',
              color: item.color,
            }}>
            {item.colorName}
          </Animatable.Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row', padding: SPACING}}>
        <Animatable.View
          animation={animation}
          delay={DURATION}
          style={{
            flex: 0.35,
            overflow: 'hidden',
          }}>
          <Animatable.View
            useNativeDriver
            animation={animation}
            delay={DURATION}
            style={{
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              marginRight: SPACING,
              overflow: 'hidden',
            }}>
            <Animatable.View
              useNativeDriver
              animation={animation}
              delay={DURATION + 100}
              style={{padding: SPACING}}>
              <Text style={{fontWeight: '800', textTransform: 'uppercase'}}>
                Advertising
              </Text>
              <Text style={{fontWeight: '800', textTransform: 'uppercase'}}>
                Marker
              </Text>
            </Animatable.View>
            <Animatable.View
              useNativeDriver
              animation={animation}
              delay={DURATION + 200}
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginRight: SPACING / 2,
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: '800',
                  padding: SPACING,
                }}>
                Play video
              </Text>
              <PlayIcon />
            </Animatable.View>
          </Animatable.View>
        </Animatable.View>
        <View style={{flex: 0.65, overflow: 'hidden'}}>
          <Animatable.Image
            useNativeDriver
            animation={animation}
            delay={DURATION + 300}
            source={item.imageUri}
            style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  heading: {
    color: '#333',
    textTransform: 'uppercase',
    fontSize: 32,
    height: 42,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 80,
  },
});
DetailHeadPhone.sharedElements = (route) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.circle`,
    },
    {
      id: `item.${item.key}.image`,
    },
  ];
};
export default DetailHeadPhone;
