import { createAction } from '@reduxjs/toolkit';

import { Board } from './board';

const fetchBoards = createAction('FETCH_BOARDS');
const fetchBoardsFailed = createAction<string>('FETCH_BOARDS_FAILED');
const fetchBoardsSucceeded = createAction(
  'FETCH_BOARDS_SUCCEEDED',
  function prepare(boards: Board[]) {
    return {
      payload: {
        boards,
        receivedAt: Date.now()
      }
    };
  }
);

export default {
  fetchBoards,
  fetchBoardsFailed,
  fetchBoardsSucceeded
};
