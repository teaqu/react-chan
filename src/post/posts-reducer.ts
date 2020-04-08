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
    state.posts = action.payload.posts;
    state.posts.map(post => {
      post.show_image = false;
      post.show_image_info = false;
    });
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
  }
});
