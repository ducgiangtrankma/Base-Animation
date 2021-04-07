import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ListStackCarousel, ScrollHeader} from '../components';
import Detail from '../components/RNStackFlatlistCarousel/Detail';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import AdvancedCarousel from '../components/AdvancedCarousel';
const Stack = createSharedElementStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false} mode="modal">
        <Stack.Screen name="AdvancedCarousel" component={AdvancedCarousel} />
        <Stack.Screen name="ListStackCarousel" component={ListStackCarousel} />
        <Stack.Screen name="ScrollHeader" component={ScrollHeader} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
