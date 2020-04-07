import { createAction } from '@reduxjs/toolkit';
import { ScaledSize } from 'react-native';

const screenChanged = createAction<ScaledSize>('SCREEN_CHANGED');

export default {
  screenChanged
};
