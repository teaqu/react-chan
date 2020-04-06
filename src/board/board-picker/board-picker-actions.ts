import { createAction } from '@reduxjs/toolkit';

const selectBoard = createAction<string>('SELECT_BOARD');

export default {
  selectBoard
};
