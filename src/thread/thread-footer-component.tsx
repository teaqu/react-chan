import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

export const ThreadFooterComponent = () => {
  const listRef = useSelector((state: RootState) => state.thread.listRef);
  const itemTop = () => {
    listRef?.scrollToIndex({ index: 0 });
  };
  return (
    <View style={styles.menu}>
      <Text style={styles.item}>
        {/*[<Text style={styles.link}>Reply to Thread</Text>]*/}
      </Text>
      <View style={styles.right}>
        <Text style={styles.item} onPress={itemTop}>
          [<Text style={styles.link}>Top</Text>]
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  menu: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: '#b7c5d9',
    marginBottom: 5
  },
  item: {
    padding: 5
  },
  link: {
    color: '#34345c'
  },
  right: {
    marginLeft: 'auto'
  }
});
