import { createAction } from '@reduxjs/toolkit';

const toggleImage = createAction<number>('TOGGLE_IMAGE');
const toggleImageInfo = createAction<number>('TOGGLE_IMAGE_INFO');

export default {
  toggleImage,
  toggleImageInfo
};
