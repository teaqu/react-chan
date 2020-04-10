import { createAction } from '@reduxjs/toolkit';

const toggleImage = createAction<number>('TOGGLE_IMAGE');
const toggleImageInfo = createAction<number>('TOGGLE_IMAGE_INFO');
const toggleReply = createAction('TOGGLE_REPLY', function prepare(
  postIndex: number,
  replyIndex: number
) {
  return {
    payload: {
      postIndex,
      replyIndex
    }
  };
});

export default {
  toggleImage,
  toggleImageInfo,
  toggleReply
};
