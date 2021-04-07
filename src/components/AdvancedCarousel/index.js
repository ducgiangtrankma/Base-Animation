import React from 'react';
import {
  View,
  Dimensions,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Simplelineicons from 'react-native-vector-icons/SimpleLineIcons';
import {Transition, Transitioning} from 'react-native-reanimated';
import posed, {Transition as PoseTransition} from 'react-native-pose';

const detailsList = ['prepTime', 'exp', 'skill', 'cousin', 'type'];
const iconByType = {
  prepTime: 'fire',
  exp: 'badge',
  skill: 'energy',
  cousin: 'chemistry',
  type: 'drop',
};
const DATA = [
  {
    image:
      'https://www.bbcgoodfoodme.com/assets/legacy/recipe_images/recipe-image-legacy-id--1259699_8.jpg',
    title: 'Lemon drizzle cake',
    description:
      'Give your sponge an Italian twist with Jane Hornby’s easy-to-make polenta cake.',
    prepTime: '1 hour',
    exp: 10,
    skill: 'easy',
    cousin: 'Vegan',
    type: 'dehydrated',
  },
  {
    image:
      'https://www.bbcgoodfoodme.com/assets/legacy/recipe_images/chocolate-avocado-cake.jpg',
    title: 'ultimate chocolate cake',
    description:
      'This indulgent, fudgy vegan bake is topped with a rich frosting – youd never guess that its free from dairy, eggs, wheat and nuts ',
    prepTime: '30 mins',
    exp: 25,
    skill: 'easy',
    cousin: 'Vegan',
    type: 'fast food',
  },
  {
    image:
      'https://www.bbcgoodfoodme.com/assets/legacy/recipe_images/cherrycake.jpg',
    title: 'Cherry blossom cake',
    description:
      'A gluten-free light bake that uses polenta in place of flour and orange blossom to flavour a drizzle syrup',
    prepTime: '1 hour',
    exp: 30,
    skill: 'easy',
    cousin: 'Vegan',
    type: 'dehydrated',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/Blackberry-and-orange-cake-1ef4b69.jpg',
    title: 'Blackberry & orange cake',
    description:
      'Try a twist on layered sponge cake with blackberries, zesty oranges and marmalade in place of your usual filling. Pipe the topping for a professional look',
    prepTime: '45 mins',
    exp: 30,
    skill: 'easy',
    cousin: 'Vegan',
    type: 'dehydrated',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Chocolate-orange-babka-9e6b992.jpg',
    title: 'Chocolate orange babka',
    description:
      'Make a chocolate orange babka for a showstopping treat at Christmas. Babka is an enriched bread dough usually made in a loaf tin, but we’ve shaped it as a wreath',
    prepTime: '40 mins',
    exp: 16,
    skill: 'More effort',
    cousin: 'Vegan',
    type: 'dehydrated',
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/Blackberry-and-orange-cake-1ef4b69.jpg',
    title: 'Blackberry & orange cake',
    description:
      'Try a twist on layered sponge cake with blackberries, zesty oranges and marmalade in place of your usual filling. Pipe the topping for a professional look',
    prepTime: '3 hour',
    exp: 10,
    skill: 'easy',
    cousin: 'Vegan',
    type: 'dehydrated',
  },
];

const {width, height} = Dimensions.get('window');

const DURATUON = 800;
const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = width * 0.8;

const colors = {
  lightBg: '#f2f2f2',
  darkBg: '#2c2d51',
  lightText: '#E5E5dd',
  darkText: '#A5a6aa',
};

const Item = ({children, style}) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          backgroundColor: 'transparnet',
          overflow: 'hidden',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const Icon = ({type}) => {
  return (
    <Simplelineicons
      name={type}
      size={26}
      color="#a5a6aa"
      style={{
        marginRight: 15,
        height: 26,
      }}
    />
  );
};

const Description = ({index, text, color}) => {
  return (
    <Item>
      <Text key={`description-${index}`} style={{fontSize: 16, color}}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({index, color, text}) => {
  return (
    <Item style={{height: TITLE_SIZE * 3, justifyContent: 'flex-end'}}>
      <Text
        key={`title-${index}`}
        style={{fontSize: TITLE_SIZE, fontWeight: '900', color}}>
        {text}
      </Text>
    </Item>
  );
};

const Details = ({color, index}) => {
  return (
    <View style={{marginVertical: SPACING}}>
      {detailsList.map((key) => {
        return (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Icon type={iconByType[key]} />
            <Item style={{flex: 1, height: 26, justifyContent: 'center'}}>
              <Text
                key={`${key}-${index}`}
                style={{fontSize: 16, color, fontWeight: '700'}}>
                {DATA[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out
      type="slide-bottom"
      durationMs={DURATUON}
      interpolation="easeIn"
    />
    <Transition.Change />
    <Transition.In
      type="slide-bottom"
      durationMs={DURATUON}
      interpolation="easeOut"
    />
  </Transition.Together>
);

const config = {
  transition: {
    type: 'tween',
    duration: DURATUON,
    easing: Easing.elastic(0.9),
  },
};
const PosedView = posed.View({
  enter: {opacity: 1, rotate: '0deg', ...config},
  exit: {opacity: 0, rotate: '180deg', ...config},
});
const ExampleFour = () => {
  const [index, setIndex] = React.useState(0); // for active slide
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headeingColor = index % 2 === 1 ? colors.lightText : colors.darkBg;
  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animaton = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animaton, {
      toValue: activeIndex,
      duration: DURATUON * 0.7,
      useNativeDriver: true,
    }).start();
  });

  const setActiveIndex = React.useCallback((newIndex) => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition();
    setIndex(newIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translateY = animaton.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

  const ref = React.useRef();
  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === DATA.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: height * DATA.length,
                transform: [{translateY}],
              },
            ]}>
            {DATA.map((_, i) => {
              return (
                <View
                  key={i}
                  style={{
                    height,
                    backgroundColor:
                      i % 2 === 0 ? colors.lightBg : colors.darkBg,
                  }}
                />
              );
            })}
          </Animated.View>
          <PoseTransition>
            {index % 2 === 0 ? (
              <PosedView
                key="image0"
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image source={{uri: DATA[index].image}} style={styles.image} />
              </PosedView>
            ) : (
              <PosedView
                key="image1"
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image source={{uri: DATA[index].image}} style={styles.image} />
              </PosedView>
            )}
          </PoseTransition>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{padding: 20, flex: 1, justifyContent: 'space-evenly'}}>
            <Title
              colors={headeingColor}
              index={index}
              text={DATA[index].title}
            />
            <Details color={color} index={index} />
            <Description
              color={headeingColor}
              text={DATA[index].description}
              index={index}
            />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default ExampleFour;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    // backgroundColor: '#f00',
    position: 'absolute',
    top: height * 0.35,
    borderWidth: 1,
    borderRadius: IMAGE_SIZE / 2,
    right: -120,
    zIndex: 1,
  },
  image: {
    flex: 1,
    backgroundColor: '#ff0',
    borderRadius: IMAGE_SIZE / 2,
  },
});
