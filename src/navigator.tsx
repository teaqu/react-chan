import React, { ReactNode, Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CatalogComponent } from './catalog/catalog_component';
import { ThreadComponent } from './thread/thread_component';

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Catalog: CatalogComponent;
  Thread: { no: number }
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