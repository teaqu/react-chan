import { createReducer } from '@reduxjs/toolkit';

import actions from './chan-actions';
import { FourChanState } from './four-chan-api';

export interface ChanAPIState {
  thumbnail: string;
  image: string;
  fileDeleted: string;
}

const initialState = FourChanState;

export default createReducer(initialState, {
  [actions.switchChanAPI.type]: (state, action) => {
    if (action.payload === '4chan') {
      state = FourChanState;
    }
  }
});
