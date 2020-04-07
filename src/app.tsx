import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Dimensions } from 'react-native';

import store from 'src/shared/store';

import screenActions from './shared/screen/screen-actions';
import { Navigator } from './shared/navigator';

declare var global: { HermesInternal: null | {} };

function setScreenDimensions() {
  store.dispatch(screenActions.screenChanged(Dimensions.get('screen')));
}

export default function App() {
  setScreenDimensions();
  Dimensions.addEventListener('change', () => setScreenDimensions());

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
