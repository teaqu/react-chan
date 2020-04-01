import { all } from 'redux-saga/effects';

import { watchFetchCatalog } from 'src/catalog/catalog-sagas';
import { watchFetchThread } from 'src/thread/thread-sagas';

export default function* rootSaga() {
  yield all([watchFetchCatalog(), watchFetchThread()]);
}
