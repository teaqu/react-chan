import React from 'react';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';

import { ThreadComponent } from 'src/thread/thread-component';
import { CatalogComponent } from 'src/catalog/catalog-component';
import { BoardPickerComponent } from 'src/board/board-picker/board-picker-component';
import { ThreadMenuComponent } from 'src/thread/thread-menu-component';
import { GalleryComponent } from 'src/thread/gallery-component';

export type RootStackParamList = {
  Catalog: typeof CatalogComponent;
  Thread: { boardId: string; threadNo: number };
  Gallery: { boardId: string; threadNo: number };
};

const RootStack = createStackNavigator<RootStackParamList>();

export function Navigator() {
  return (
    <RootStack.Navigator
      initialRouteName="Catalog"
      screenOptions={{
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <RootStack.Screen
        name="Catalog"
        component={CatalogComponent}
        options={{
          headerTitle: () => <BoardPickerComponent />,
          headerTitleAlign: 'center'
        }}
      />
      <RootStack.Screen
        name="Thread"
        component={ThreadComponent}
        options={{
          gestureEnabled: true,
          headerTitle: () => <Text />,
          headerRight: () => <ThreadMenuComponent />
        }}
      />
      <RootStack.Screen
        name="Gallery"
        component={GalleryComponent}
        options={{
          headerStyle: styles.header
        }}
      />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#d6daf0',
    shadowColor: '#b7c5d9'
  }
});
