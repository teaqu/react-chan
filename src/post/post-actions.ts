import { createAction } from '@reduxjs/toolkit';

const toggleImage = createAction<string>('TOGGLE_IMAGE');
const toggleImageInfo = createAction<string>('TOGGLE_IMAGE_INFO');
const clearRedBorder = createAction<string>('CLEAR_RED_BORDER');
const toggleReply = createAction('TOGGLE_REPLY', function prepare(
  postStateKey: string,
  replyNo: number
) {
  return {
    payload: {
      postStateKey,
      replyNo
    }
  };
});
const toggleComReply = createAction('SHOW_COM_REPLY', function prepare(
  postStateKey: string,
  replyNo: number,
  replyIndex: number
) {
  return {
    payload: {
      postStateKey,
      replyNo,
      replyIndex
    }
  };
});

export default {
  toggleImage,
  toggleImageInfo,
  toggleReply,
  toggleComReply,
  clearRedBorder
};
