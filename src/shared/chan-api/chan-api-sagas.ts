import { AnyAction } from 'redux';
import { setContext, takeLatest } from 'redux-saga/effects';

import actions from './chan-api-actions';
import fourChanAPI from './four-chan-api';

//
export function* switchChanAPI(action: AnyAction) {
  if (action.payload === '4chan') {
    setContext(fourChanAPI);
  }
}

export function* watchFetchCatalog() {
  yield takeLatest(actions.switchChanAPI, switchChanAPI);
}
