import { createAction } from '@reduxjs/toolkit';

const toggleImage = createAction<number>('TOGGLE_IMAGE');
const toggleImageInfo = createAction<number>('TOGGLE_IMAGE_INFO');
const calcReplies = createAction<number>('CALC_REPLIES');
const saveReplies = createAction('SAVE_REPLIES', function prepare(
  index: number,
  replies: number[]
) {
  return {
    payload: {
      index,
      replies
    }
  };
});

export default {
  toggleImage,
  toggleImageInfo,
  calcReplies,
  saveReplies
};
