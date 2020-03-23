import React, { ReactNode, Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThreadComponent } from 'src/thread/thread-component';
import CatalogComponent from 'src/catalog/catalog-component';

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Catalog: typeof CatalogComponent;
  Thread: { no: number };
};

export class Navigator extends Component {
  render(): ReactNode {
    return (
      <RootStack.Navigator initialRouteName="Catalog">
        <RootStack.Screen name="Catalog" component={CatalogComponent} />
        <RootStack.Screen name="Thread" component={ThreadComponent} />
      </RootStack.Navigator>
    );
  }
}
