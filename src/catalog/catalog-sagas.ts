import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import { ChanAPI } from 'src/shared/chan-api';
import { Thread } from 'src/thread/thread';

import actions from './catalog-actions';

type fetchCatalogAction = {
  type: string;
  payload: string;
};

export function* fetchCatalog(action: fetchCatalogAction) {
  try {
    const chanAPI: ChanAPI = yield getContext('chanAPI');
    const threads: Thread[] = yield call(chanAPI.fetchCatalog, action.payload);
    yield put(actions.fetchCatalogSucceeded(action.payload, threads));
  } catch (e) {
    yield put(actions.fetchCatalogFailed(e.message));
  }
}

export function* watchFetchCatalog() {
  yield takeLatest(actions.fetchCatalog, fetchCatalog);
}
