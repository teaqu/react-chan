import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import store from 'src/shared/store';

import { Navigator } from './shared/navigator';

declare var global: { HermesInternal: null | {} };

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#b8bccf" />
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
