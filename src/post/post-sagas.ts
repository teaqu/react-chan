import { put, call, select, takeLatest, getContext } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { ChanAPI } from 'src/shared/chan-api/chan-api';
import { RootState } from 'src/shared/root-reducer';

import actions from './post-actions';

export const getPosts = (state: RootState) => state.posts.posts;

export function* calcReplies(action: AnyAction) {
  let posts = yield select(getPosts);
  const chanAPI: ChanAPI = yield getContext('chanAPI');
  const replies: number[] = yield call(
    chanAPI.calcReplies,
    action.payload,
    posts
  );
  yield put(actions.saveReplies(action.payload, replies));
}

export function* watchCalcReplies() {
  yield takeLatest(actions.calcReplies, calcReplies);
}
