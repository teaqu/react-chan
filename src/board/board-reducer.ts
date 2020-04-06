import { createReducer } from '@reduxjs/toolkit';

import actions from './board-actions';
import { Board } from './board';

export interface BoardsState {
  isFetching: boolean;
  error: string;
  boards: Board[];
}

const initialState: BoardsState = {
  isFetching: false,
  error: '',
  boards: []
};

export default createReducer(initialState, {
  [actions.fetchBoards.type]: state => {
    state.isFetching = true;
  },
  [actions.fetchBoardsSucceeded.type]: (state, action) => {
    state.isFetching = false;
    state.boards = action.payload.boards;
  },
  [actions.fetchBoardsFailed.type]: (state, action) => {
    state.error = action.payload;
    state.isFetching = true;
  }
});
