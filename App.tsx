import 'react-native-gesture-handler';

import React, { Component, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CatalogComponent } from './src/catalog/catalog_component';

declare var global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

export default class App extends Component {

  render(): ReactNode {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Catalog">
        <Stack.Screen name="Catalog" component={CatalogComponent}/>
        </Stack.Navigator>
      </NavigationContainer>  
    );
  }
}