import { createReducer } from '@reduxjs/toolkit';

import threadActions from 'src/thread/thread-actions';

import { Post } from './post';
import postActions from './post-actions';

export interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: []
};

export default createReducer(initialState, {
  [threadActions.invalidateThread.type]: state => {
    state.posts = [];
  },
  [threadActions.fetchThreadSucceeded.type]: (state, action) => {
    let posts = action.payload.posts;
    let length = posts.length;
    for (let i = 0; i < length; i++) {
      // set default state
      posts[i].show_image = false;
      posts[i].show_image_info = false;
      posts[i].reply_links_showing = [];
    }
    state.posts = posts;
  },
  [postActions.toggleImage.type]: (state, action) => {
    let post = state.posts.find(p => p.tim === action.payload);
    if (post) {
      post.show_image = !post.show_image;
    }
  },
  [postActions.toggleImageInfo.type]: (state, action) => {
    let post = state.posts.find(p => p.tim === action.payload);
    if (post) {
      post.show_image_info = !post.show_image_info;
    }
  },
  [postActions.toggleReply.type]: (state, action) => {
    const pIndex = action.payload.postIndex; // the post
    const rIndex = action.payload.replyIndex; // The reply we want to inline
    let post = state.posts[pIndex];
    if (!post.reply_links_showing.includes(rIndex)) {
      // Show inline reply
      post.reply_links_showing.unshift(rIndex);
      state.posts[rIndex].hidden = true;
    } else {
      // Clear inline reply
      clearInline(state.posts, rIndex);
      post.reply_links_showing = post.reply_links_showing.filter(
        r => r !== rIndex
      );
    }
  }
});

/**
 * Recursively clear inline replies from given index
 *
 * @param posts our posts
 * @param index the post to clear
 */
function clearInline(posts: Post[], index: number) {
  const post = posts[index];
  if (post.reply_links_showing.length > 0) {
    post.reply_links_showing.map(replyIndex => {
      clearInline(posts, replyIndex);
    });
    post.reply_links_showing = [];
  }
  post.hidden = false;
}
