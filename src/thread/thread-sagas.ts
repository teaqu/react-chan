import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import { ChanAPI } from 'src/shared/chan-api';
import { Post } from 'src/post/post';

import actions from './thread-actions';

type fetchThreadAction = {
  type: string;
  payload: {
    boardId: string;
    threadNo: number;
  };
};

export function* fetchThread(action: fetchThreadAction) {
  try {
    const chanAPI: ChanAPI = yield getContext('chanAPI');
    const boardId = action.payload.boardId;
    const threadNo = action.payload.threadNo;
    const posts: Post[] = yield call(chanAPI.fetchThread, boardId, threadNo);
    yield put(actions.fetchThreadSucceeded(boardId, threadNo, posts));
  } catch (e) {
    yield put(actions.fetchThreadFailed(e.message));
  }
}

export function* watchFetchThread() {
  yield takeLatest(actions.fetchThread, fetchThread);
}
