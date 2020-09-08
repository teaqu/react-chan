import { createAction } from '@reduxjs/toolkit';

const toggleImage = createAction<string>('TOGGLE_IMAGE');
const toggleImageInfo = createAction<string>('TOGGLE_IMAGE_INFO');
const clearRedBorder = createAction<string>('CLEAR_RED_BORDER');
const jumpToPost = createAction<string>('JUMP_TO_POST');
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
const setHeight = createAction('SET_HEIGHT', function prepare(
  postStateKey: string,
  height: number
) {
  return {
    payload: {
      postStateKey,
      height
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
  clearRedBorder,
  jumpToPost,
  setHeight
};
