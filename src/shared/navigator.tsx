import React from 'react';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import { Text, StyleSheet, View } from 'react-native';

import { ThreadComponent } from 'src/thread/thread-component';
import { CatalogComponent } from 'src/catalog/catalog-component';
import { BoardPickerComponent } from 'src/board/board-picker/board-picker-component';

export type RootStackParamList = {
  Catalog: typeof CatalogComponent;
  Thread: { boardId: string; threadNo: number };
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
          headerRight: () => <View />,
          headerStyle: styles.header
        }}
      />
      <RootStack.Screen
        name="Thread"
        component={ThreadComponent}
        options={{
          gestureEnabled: true,
          headerTitle: () => <Text />,
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
