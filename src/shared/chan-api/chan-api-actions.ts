import { createAction } from '@reduxjs/toolkit';

const switchChanAPI = createAction<string>('SWITCH_CHAN_API');

export default {
  switchChanAPI
};
