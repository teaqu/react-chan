import { combineReducers } from 'redux';

import catalogReducer, { CatalogState } from 'src/catalog/catalog-reducers';
import threadReducuer, { ThreadState } from 'src/thread/thread-reducuer';

export interface RootState {
  catalog: CatalogState;
  thread: ThreadState;
}

const rootReducer = combineReducers({
  catalog: catalogReducer,
  thread: threadReducuer
});

export default rootReducer;
