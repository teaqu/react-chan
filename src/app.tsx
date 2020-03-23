import React, { Component, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from 'src/shared/store';
import { Navigator } from 'src/shared/navigator';

declare var global: { HermesInternal: null | {} };

export default class App extends Component {
  render(): ReactNode {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
    );
  }
}
