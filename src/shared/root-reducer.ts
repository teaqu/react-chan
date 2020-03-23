import { combineReducers } from 'redux';

import catalogReducer, { CatalogState } from 'src/catalog/catalog-reducers';

export interface RootState {
  catalog: CatalogState;
}

const rootReducer = combineReducers({
  catalog: catalogReducer
});

export default rootReducer;
