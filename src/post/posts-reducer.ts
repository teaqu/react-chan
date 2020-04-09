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
    for (let i = 0; i < posts.length; i++) {
      posts[i].show_image = false;
      posts[i].show_image_info = false;
      posts[i].index = i;
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
  [postActions.saveReplies.type]: (state, action) => {
    let post = state.posts[action.payload.index];
    if (post) {
      post.post_replies = action.payload.replies;
    }
  }
});
