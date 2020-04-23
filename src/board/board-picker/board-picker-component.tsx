import React, { useState } from 'react';
import { StyleSheet, Text, Modal, Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  TouchableHighlight,
  FlatList,
  TouchableOpacity
} from 'react-native-gesture-handler';

import { RootState } from 'src/shared/root-reducer';
import catalogActions from 'src/catalog/catalog-actions';

import boardActions from '../board-actions';
import { Board } from '../board';

import boardPickerActions from './board-picker-actions';

export function BoardPickerComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(boardActions.fetchBoards());
  }, [dispatch]);

  const boards: Board[] = useSelector(
    (state: RootState) => state.boards.boards
  );
  const selectedBoard = useSelector(
    (state: RootState) => state.boardPicker.boardId
  );

  const board = boards.find(b => b.board === selectedBoard);
  const [modalVisible, setModalVisible] = useState(false);
  const setSelectedValue = (boardId: string) => {
    dispatch(catalogActions.invalidateCatalog());
    dispatch(boardPickerActions.selectBoard(boardId));
  };
  const renderItem = (item: any) => (
    <TouchableHighlight
      style={styles.item}
      onPress={() => {
        setSelectedValue(item.item.board);
        setModalVisible(false);
      }}
    >
      <Text>
        /{item.item.board}/ - {item.item.title}
      </Text>
    </TouchableHighlight>
  );

  const keyExtractor = (item: any) => item.board;
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text>Select board: </Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>x</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList<Board>
              style={styles.list}
              data={boards}
              numColumns={1}
              removeClippedSubviews={false}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>

      {board && (
        <Text
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          /{board.board}/ - {board.title}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    backgroundColor: '#eef2ff',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonView: {
    marginLeft: 'auto'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  list: {
    width: '100%'
  },
  item: {
    padding: 10,
    marginBottom: 4,
    borderColor: '#b7c5d9',
    borderWidth: 1,
    backgroundColor: '#d6daf0'
  }
});
