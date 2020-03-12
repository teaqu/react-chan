import 'react-native-gesture-handler';

import React, { Component, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CatalogScreen } from './src/screens/catalog_screen';

declare var global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

export default class App extends Component {

  render(): ReactNode {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Catalog">
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        </Stack.Navigator>
      </NavigationContainer>  
    );
  }
}