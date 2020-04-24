import { createReducer } from '@reduxjs/toolkit';

import threadActions from 'src/thread/thread-actions';
import { Posts, PostStates } from 'src/shared/chan-api/chan-api';

import postActions from './post-actions';
import { initialPostState, findReplyInStateTree } from './post-state';

export interface PostsState {
  posts: Posts;
  postStates: PostStates;
}

const initialState: PostsState = {
  posts: {},
  postStates: {}
};

export default createReducer(initialState, {
  [threadActions.fetchThread.type]: state => {
    state.posts = {};
    state.postStates = {};
  },
  [threadActions.invalidateThread.type]: state => {
    state.posts = {};
    state.postStates = {};
  },
  [threadActions.fetchThreadSucceeded.type]: (state, action) => {
    let posts = action.payload.posts;
    // set default state
    for (let no in posts) {
      posts[no].reply_links = [];
      state.postStates[no] = initialPostState;
    }
    state.posts = action.payload.posts;
  },
  [postActions.toggleImage.type]: (state, action) => {
    const postState = state.postStates[action.payload];
    postState.show_image = !postState.show_image;
  },
  [postActions.toggleImageInfo.type]: (state, action) => {
    const postState = state.postStates[action.payload];
    postState.show_image_info = !postState.show_image_info;
  },
  [postActions.toggleReply.type]: (state, action) => {
    const { postStateKey, replyNo } = action.payload;
    const postState = state.postStates[postStateKey];
    const replyStateKey = `${postStateKey}-${replyNo}`;

    // Show a red border if we're already showing this reply higher up
    // in the inline post chain
    const replyState = findReplyInStateTree(postStateKey, replyNo);
    if (replyState) {
      state.postStates[replyState].red_border = true;
    }
    // Show inline reply
    else if (!postState.reply_links_showing.includes(replyNo)) {
      state.postStates[replyStateKey] = initialPostState;
      postState.reply_links_showing.unshift(replyNo);
      state.postStates[replyNo].hidden = true;
    } else {
      // Clear inline reply
      postState.reply_links_showing = postState.reply_links_showing.filter(
        r => r !== replyNo
      );
      delete state.postStates[replyStateKey];
      state.postStates[replyNo].hidden = false;
    }
  },
  [postActions.toggleComReply.type]: (state, action) => {
    const { postStateKey, replyNo, replyIndex } = action.payload;
    let postState = state.postStates[postStateKey];
    const replyStateKey = `${postStateKey}-com-${replyNo}[${replyIndex}]`;

    // Show a red border if we're already showing this reply higher up
    // in the inline post chain
    const replyState = findReplyInStateTree(postStateKey, replyNo);
    if (replyState) {
      state.postStates[replyState].red_border = true;
    }
    // Show the inline comment reply
    else if (
      !postState.com_reply_links_showing.some(link => link.index === replyIndex)
    ) {
      state.postStates[replyStateKey] = initialPostState;
      postState.com_reply_links_showing.push({
        no: replyNo,
        index: replyIndex
      });
      postState.com_reply_links_showing = postState.com_reply_links_showing.sort(
        (a, b) => a.index - b.index
      );
    }
    // Clear inline comment reply
    else {
      postState.com_reply_links_showing = postState.com_reply_links_showing.filter(
        r => r.index !== replyIndex
      );
      delete state.postStates[replyStateKey];
    }
  },
  [threadActions.calcRepliesSucceeded.type]: (state, action) => {
    const posts: Posts = state.posts;
    const reply_links = action.payload;
    for (let no in posts) {
      posts[no].reply_links = reply_links[no];
    }
  },
  [postActions.clearRedBorder.type]: (state, action) => {
    state.postStates[action.payload].red_border = false;
  }
});
