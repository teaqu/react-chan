import { createReducer } from '@reduxjs/toolkit';
import { FlatList } from 'react-native';

import { Post } from 'src/post/post';
import threadActions from 'src/thread/thread-actions';
import { findReplyInStateTree, initialPostState } from 'src/post/post-state';
import postActions from 'src/post/post-actions';
import { Posts, PostStates } from 'src/shared/chan-api/chan-api';

export interface ThreadState {
  isFetching: boolean;
  error: string;
  threadNo: number;
  listRef: FlatList<Post> | null;
  galleryPos: number;
  posts: Posts;
  postStates: PostStates;
}

const initialState: ThreadState = {
  isFetching: false,
  error: '',
  threadNo: 0,
  listRef: null,
  galleryPos: 0,
  posts: {},
  postStates: {}
};

export default createReducer(initialState, {
  [threadActions.fetchThread.type]: (state, action) => {
    state.isFetching = true;
    state.threadNo = action.payload.threadNo;
    state.posts = {};
    state.postStates = {};
  },
  [threadActions.fetchThreadFailed.type]: (state, action) => {
    state.error = action.payload;
    state.isFetching = true;
  },
  [threadActions.setListRef.type]: (state, action) => {
    state.listRef = action.payload;
  },
  [threadActions.setGalleryPos.type]: (state, action) => {
    state.galleryPos = action.payload;
  },
  [threadActions.invalidateThread.type]: state => {
    state.posts = {};
    state.postStates = {};
  },
  [threadActions.fetchThreadSucceeded.type]: (state, action) => {
    state.isFetching = false;

    let posts = action.payload.posts;

    // post index within thread
    let i = 0;

    // set default state
    Object.keys(posts).forEach(no => {
      posts[no].reply_links = [];
      state.postStates[no] = { ...initialPostState, index: i++ };
    });
    state.posts = posts;
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

    // Add reply links to each post
    Object.keys(posts).forEach(no => {
      posts[no].reply_links = reply_links[no];
    });
  },
  [postActions.clearRedBorder.type]: (state, action) => {
    state.postStates[action.payload].red_border = false;
  },
  [postActions.setHeight.type]: (state, action) => {
    const { postStateKey, height } = action.payload;
    state.postStates[postStateKey].height = height;
  },
  [postActions.jumpToPost.type]: (state, action) => {
    const states = state.postStates;
    Object.values(states).forEach(s => {
      s.jumped = false;
    });
    states[action.payload].jumped = true;
    states[action.payload].hidden = false;
  },
  [threadActions.calcHeightsSucceeded.type]: (state, action) => {
    const postStates = Object.values(state.postStates);
    const heights: number[] = action.payload;
    for (let i = 0; i < postStates.length; i++) {
      postStates[i].height = heights[i];
    }
  }
});
