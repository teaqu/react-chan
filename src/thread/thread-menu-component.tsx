import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

export function ThreadMenuComponent() {
  const listRef = useSelector((state: RootState) => state.thread.listRef);
  const [modalVisible, setModalVisible] = useState(false);
  const itemTop = () => {
    listRef?.scrollToIndex({ index: 0 });
    setModalVisible(false);
  };
  const itemBottom = () => {
    listRef?.scrollToEnd();
    setModalVisible(false);
    listRef?.scrollToEnd();
  };
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.menuView}>
          <TouchableOpacity onPress={itemTop}>
            <View style={styles.menuItem}>
              <Text>Top</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={itemBottom}>
            <View style={styles.menuItem}>
              <Text>Bottom</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text onPress={() => setModalVisible(true)} style={styles.menuButton}>
        ⋮
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    fontSize: 20,
    paddingRight: 15,
    paddingLeft: 30,
    paddingTop: 5,
    paddingBottom: 5
  },
  menuView: {
    backgroundColor: '#eef2ff',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    shadowColor: '#000',
    width: '40%',
    marginTop: 15,
    marginRight: 10,
    padding: 5,
    alignSelf: 'flex-end',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  menuItem: {
    padding: 10
  }
});
