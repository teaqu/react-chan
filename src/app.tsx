import 'react-native-gesture-handler';

import React, { Component, ReactNode } from 'react';
import { Navigator } from 'src/navigator';
import { NavigationContainer } from '@react-navigation/native';

declare var global: {HermesInternal: null | {}};

export default class App extends Component {

  render(): ReactNode {
    return (
      <NavigationContainer>
        <Navigator />  
      </NavigationContainer>
    );
  }
}