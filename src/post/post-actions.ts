import { createAction } from '@reduxjs/toolkit';

const toggleImage = createAction<number>('TOGGLE_IMAGE');
const toggleImageInfo = createAction<number>('TOGGLE_IMAGE_INFO');
const toggleReply = createAction('TOGGLE_REPLY', function prepare(
  postNo: number,
  replyNo: number
) {
  return {
    payload: {
      postNo,
      replyNo
    }
  };
});

export default {
  toggleImage,
  toggleImageInfo,
  toggleReply
};
