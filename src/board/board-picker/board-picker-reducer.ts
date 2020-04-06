import { createReducer } from '@reduxjs/toolkit';

import actions from './board-picker-actions';

export interface BoardPickerState {
  boardId: string;
}

const initialState: BoardPickerState = {
  boardId: 'a'
};

export default createReducer(initialState, {
  [actions.selectBoard.type]: (state, action) => {
    state.boardId = action.payload;
  }
});
