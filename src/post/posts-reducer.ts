import { createReducer } from '@reduxjs/toolkit';

import threadActions from 'src/thread/thread-actions';
import { Posts } from 'src/shared/chan-api/chan-api';

import postActions from './post-actions';

export interface PostsState {
  posts: Posts;
}

const initialState: PostsState = {
  posts: {}
};

export default createReducer(initialState, {
  [threadActions.invalidateThread.type]: state => {
    state.posts = {};
  },
  [threadActions.fetchThreadSucceeded.type]: (state, action) => {
    let posts = action.payload.posts;
    // set default state
    for (let no in posts) {
      posts[no].show_image = false;
      posts[no].show_image_info = false;
      posts[no].reply_links_showing = [];
    }
    state.posts = action.payload.posts;
  },
  [postActions.toggleImage.type]: (state, action) => {
    const post = state.posts[action.payload];
    post.show_image = !post.show_image;
  },
  [postActions.toggleImageInfo.type]: (state, action) => {
    const post = state.posts[action.payload];
    post.show_image_info = !post.show_image_info;
  },
  [postActions.toggleReply.type]: (state, action) => {
    const postNo = action.payload.postNo; // the post
    const replyNo = action.payload.replyNo; // The reply we want to inline
    let post = state.posts[postNo];
    if (!post.reply_links_showing.includes(replyNo)) {
      // Show inline reply
      post.reply_links_showing.unshift(replyNo);
      state.posts[replyNo].hidden = true;
    } else {
      // Clear inline reply
      clearInline(state.posts, replyNo);
      post.reply_links_showing = post.reply_links_showing.filter(
        r => r !== replyNo
      );
    }
  }
});

/**
 * Recursively clear inline replies from given index
 *
 * @param posts
 * @param postNo
 */
function clearInline(posts: Posts, postNo: number) {
  const post = posts[postNo];
  if (post.reply_links_showing.length > 0) {
    post.reply_links_showing.map(replyNo => {
      clearInline(posts, replyNo);
    });
    post.reply_links_showing = [];
  }
  post.hidden = false;
}
