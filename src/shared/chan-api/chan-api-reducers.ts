import { createReducer } from '@reduxjs/toolkit';

import actions from './chan-api-actions';
import fourChanAPI from './four-chan-api';
import { ChanAPI } from './chan-api';

const initialState: ChanAPI = fourChanAPI;

export default createReducer(initialState, {
  [actions.switchChanAPI.type]: (state, action) => {
    if (action.payload === '4chan') {
      // eslint-disable-next-line no-param-reassign
      state = fourChanAPI;
    }
  }
});
