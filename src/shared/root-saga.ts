import { all } from 'redux-saga/effects';

import { watchFetchCatalog } from 'src/catalog/catalog-sagas';
import { watchFetchThread } from 'src/thread/thread-sagas';
import { watchFetchBoards } from 'src/board/board-sagas';

export default function* rootSaga() {
  yield all([watchFetchCatalog(), watchFetchThread(), watchFetchBoards()]);
}
