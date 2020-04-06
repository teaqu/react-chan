import React from 'react';
import { Picker, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { RootState } from 'src/shared/root-reducer';

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

  const setSelectedValue = (boardId: string) => {
    dispatch(boardPickerActions.selectBoard(boardId));
  };
  return (
    <Picker
      mode={'dropdown'}
      selectedValue={selectedBoard}
      style={styles.picker}
      onValueChange={boardId => setSelectedValue(boardId)}
    >
      {boards.map(board => (
        <Picker.Item
          key={board.board}
          label={`/${board.board}/ - ${board.title}`}
          value={board.board}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 300
  }
});
