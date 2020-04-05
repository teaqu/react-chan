import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import FourChanAPI from './chan-api/four-chan-api';

const sagaMiddleware = createSagaMiddleware({
  context: {
    chanAPI: FourChanAPI
  }
});

export default configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);
