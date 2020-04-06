import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import { ChanAPI } from 'src/shared/chan-api/chan-api';

import actions from './board-actions';
import { Board } from './board';

export function* fetchBoards() {
  try {
    const chanAPI: ChanAPI = yield getContext('chanAPI');
    const boards: Board[] = yield call(chanAPI.fetchBoards);
    yield put(actions.fetchBoardsSucceeded(boards));
  } catch (e) {
    yield put(actions.fetchBoardsFailed(e.message));
  }
}

export function* watchFetchBoards() {
  yield takeLatest(actions.fetchBoards, fetchBoards);
}
