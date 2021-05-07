import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  ListStackCarousel,
  ScrollHeader,
  AdvancedCarousel,
  TabAnimation,
  HeadPhone,
  List,
} from '../components';
import Detail from '../components/RNStackFlatlistCarousel/Detail';
import DetailHeadPhone from '../components/HeadPhone/Detail';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
const Stack = createSharedElementStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false} mode="modal">
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="HeadPhone" component={HeadPhone} />
        <Stack.Screen name="ScrollHeader" component={ScrollHeader} />
        <Stack.Screen name="AdvancedCarousel" component={AdvancedCarousel} />
        <Stack.Screen name="ListStackCarousel" component={ListStackCarousel} />
        <Stack.Screen name="TabAnimation" component={TabAnimation} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen
          name="DetailHeadPhone"
          component={DetailHeadPhone}
          options={(navigation) => ({
            headerBackTitleVisible: false,
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
          sharedElementsConfig={(route) => {
            const {item} = route.params;
            return [
              {
                id: `item.${item.key}.image`,
                animation: 'fade',
              },
              {
                id: `item.${item.key}.circle`,
                animation: 'fade',
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
