import { combineReducers } from 'redux';

import catalogReducer, { CatalogState } from 'src/catalog/catalog-reducers';
import threadReducuer, { ThreadState } from 'src/thread/thread-reducuer';

import chanAPIReducer, { ChanAPIState } from './chan-api/chan-reducers';

export interface RootState {
  catalog: CatalogState;
  thread: ThreadState;
  chanAPI: ChanAPIState;
}

const rootReducer = combineReducers({
  catalog: catalogReducer,
  thread: threadReducuer,
  chanAPI: chanAPIReducer
});

export default rootReducer;
