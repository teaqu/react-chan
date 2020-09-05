import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import reactStringReplace from 'react-string-replace';
import fuzzysort from 'fuzzysort';

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

  const currentBoard = boards.find(b => b.board === selectedBoard);
  const [modalVisible, setModalVisible] = useState(false);
  const setSelectedValue = (boardId: string) => {
    dispatch(catalogActions.invalidateCatalog());
    dispatch(boardPickerActions.selectBoard(boardId));
  };

  // Render for filtered boards generated via search
  const renderFiltered = (item: any) => (
    <TouchableHighlight
      style={styles.item}
      onPress={() => {
        setSelectedValue(item.item.obj.board);
        setModalVisible(false);
      }}
    >
      <Text>
        {reactStringReplace(
          fuzzysort.highlight(item.item[2], '<b>', '</b>') || '',
          /<b>(.*?)<\/b>/,
          (match, i) => (
            <Text key={match + i} style={styles.highlight}>
              {match}
            </Text>
          )
        )}
      </Text>
    </TouchableHighlight>
  );

  const renderBoards = (item: any) => (
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

  const [filtered, setFiltered]: any = useState([]);

  const boardKeyExtractor = (item: any) => item.board;
  const filteredKeyExtractor = (item: any) => item.obj.board;
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
        <KeyboardAvoidingView
          style={styles.centeredView}
          keyboardVerticalOffset={50}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TextInput
                autoFocus
                placeholder="Search"
                autoCapitalize="none"
                onSubmitEditing={() => {
                  setSelectedValue(filtered[0].obj.board);
                  setFiltered([]);
                  setModalVisible(false);
                }}
                onChangeText={text => {
                  // Add boardTitle so we can search over `/[board]/ - [title]`
                  const search = boards.map(b => ({
                    ...b,
                    boardTitle: `/${b.board}/ - ` + b.title
                  }));
                  const results = fuzzysort.go(text, search, {
                    // Give preference to board id first
                    keys: ['board', 'title', 'boardTitle']
                  });
                  setFiltered(results);
                }}
              />
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setFiltered([]);
                    setModalVisible(false);
                  }}
                >
                  <>
                    <Text style={styles.textStyle}>Close</Text>
                  </>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList<Board>
              style={styles.list}
              data={filtered.length ? filtered : boards}
              numColumns={1}
              removeClippedSubviews={false}
              keyboardShouldPersistTaps={'handled'}
              keyExtractor={
                filtered.length ? filteredKeyExtractor : boardKeyExtractor
              }
              renderItem={filtered.length ? renderFiltered : renderBoards}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {currentBoard && (
        <TouchableOpacity
          style={styles.title}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text>
            /{currentBoard.board}/ - {currentBoard.title}
          </Text>
          <Text style={styles.arrow}>{modalVisible ? '\u25B4' : '\u25BE'}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
    paddingBottom: 40,
    maxHeight: '95%'
  },
  modalView: {
    backgroundColor: '#eef2ff',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    shadowColor: '#000',
    width: '90%',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    padding: 10
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
  },
  arrow: {
    color: '#333',
    paddingLeft: 2
  },
  highlight: {
    fontWeight: 'bold'
  },
  title: {
    flexDirection: 'row'
  }
});
