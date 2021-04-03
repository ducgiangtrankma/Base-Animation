import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {EasingNode} from 'react-native-reanimated';
import {styles} from './styles';
const {Value, timing} = Animated;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
//
const _input_box_translate_x = new Value(width);
const _back_button_opacity = new Value(0);
const _content_translate_y = new Value(height);
const _content_opacity = new Value(0);
const FBSearch = () => {
  const input = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState('');
  const _onFocus = () => {
    setIsFocused(true);
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };
    // run animation
    timing(_input_box_translate_x, input_box_translate_x_config).start();
    timing(_back_button_opacity, back_button_opacity_config).start();
    timing(_content_translate_y, content_translate_y_config).start();
    timing(_content_opacity, content_opacity_config).start();
    input.current.focus();
  };

  const _onBlur = () => {
    // update state
    setIsFocused(false);
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
      speed: 12,
    };

    // run animation
    timing(_input_box_translate_x, input_box_translate_x_config).start();
    timing(_back_button_opacity, back_button_opacity_config).start();
    timing(_content_translate_y, content_translate_y_config).start();
    timing(_content_opacity, content_opacity_config).start();

    // force blur
    input.current.blur();
  };
  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <View>
              <Image
                source={require('../../assets/fbLogo.png')}
                style={styles.fbAvatar}
              />
            </View>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={_onFocus}
              style={styles.search_icon_box}>
              <Icon name="search" size={22} color="#000000" />
            </TouchableHighlight>
            <Animated.View
              style={[
                styles.input_box,
                {transform: [{translateX: _input_box_translate_x}]},
              ]}>
              <Animated.View style={{opacity: _back_button_opacity}}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={'#ccd0d5'}
                  onPress={_onBlur}
                  style={styles.back_icon_box}>
                  <Icon name="chevron-left" size={22} color="#000000" />
                </TouchableHighlight>
              </Animated.View>
              <TextInput
                ref={input}
                placeholder="Search Facebook"
                clearButtonMode="always"
                // value={keyword}
                onChangeText={setKeyword}
                style={styles.input}
              />
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: _content_opacity,
            transform: [{translateY: _content_translate_y}],
          },
        ]}>
        <SafeAreaView style={styles.content_safe_area}>
          <View style={styles.content_inner}>
            <View style={styles.separator} />
            {keyword === '' ? (
              <View style={styles.image_placeholder_container}>
                <Image
                  source={require('../../assets/noResults.png')}
                  style={styles.image_placeholder}
                />
                <Text style={styles.image_placeholder_text}>
                  Enter a few words{'\n'}
                  to search on Facebook
                </Text>
              </View>
            ) : (
              <ScrollView>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Result 1</Text>
                </View>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Result 2</Text>
                </View>
                <View style={styles.search_item}>
                  <Icon
                    style={styles.item_icon}
                    name="search"
                    size={16}
                    color="#cccccc"
                  />
                  <Text>Result 3</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default React.memo(FBSearch);
