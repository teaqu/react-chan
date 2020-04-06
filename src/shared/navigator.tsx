import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ThreadComponent } from 'src/thread/thread-component';
import { CatalogComponent } from 'src/catalog/catalog-component';
import { BoardPickerComponent } from 'src/board/board-picker/board-picker-component';

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Catalog: typeof CatalogComponent;
  Thread: { boardId: string; threadNo: number };
};

export function Navigator() {
  return (
    <RootStack.Navigator initialRouteName="Catalog">
      <RootStack.Screen
        name="Catalog"
        component={CatalogComponent}
        options={{
          headerTitle: () => <BoardPickerComponent />
        }}
      />
      <RootStack.Screen name="Thread" component={ThreadComponent} />
    </RootStack.Navigator>
  );
}
