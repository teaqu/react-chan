import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

export default configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});
