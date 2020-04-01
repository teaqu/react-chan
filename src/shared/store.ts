import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import FourChanAPI from './4chan-api';

const chanAPI = new FourChanAPI();

const sagaMiddleware = createSagaMiddleware({
  context: {
    chanAPI
  }
});

export default configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);
