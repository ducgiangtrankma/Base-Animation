import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ListStackCarousel, ScrollHeader} from '../components';
import Detail from '../components/RNStackFlatlistCarousel/Detail';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
const Stack = createSharedElementStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false} mode="modal">
        <Stack.Screen name="ListStackCarousel" component={ListStackCarousel} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="ScrollHeader" component={ScrollHeader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
