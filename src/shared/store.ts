import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});
