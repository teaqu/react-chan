import { createReducer } from '@reduxjs/toolkit';
import { ScaledSize } from 'react-native';

import actions from './screen-actions';

const initialState: ScaledSize = {
  width: 0,
  height: 0,
  scale: 0,
  fontScale: 0
};

export default createReducer(initialState, {
  [actions.screenChanged.type]: (state, action) => {
    state.fontScale = action.payload.fontScale;
    state.height = action.payload.height;
    state.scale = action.payload.scale;
    state.width = action.payload.width;
  }
});
