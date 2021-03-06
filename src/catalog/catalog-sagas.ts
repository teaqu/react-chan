import { call, put, takeLatest, getContext } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { ChanAPI, Threads } from 'src/shared/chan-api/chan-api';

import actions from './catalog-actions';

export function* fetchCatalog(action: AnyAction) {
  try {
    const chanAPI: ChanAPI = yield getContext('chanAPI');
    const threads: Threads = yield call(chanAPI.fetchCatalog, action.payload);
    yield put(actions.fetchCatalogSucceeded(action.payload, threads));
  } catch (e) {
    yield put(actions.fetchCatalogFailed(e.message));
  }
}

export function* watchFetchCatalog() {
  yield takeLatest(actions.fetchCatalog, fetchCatalog);
}
