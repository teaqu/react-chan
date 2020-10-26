import { combineReducers } from 'redux';

import catalogReducer, { CatalogState } from 'src/catalog/catalog-reducers';
import threadReducer, { ThreadState } from 'src/thread/thread-reducer';
import boardReducer, { BoardsState } from 'src/board/board-reducer';
import chanAPIReducer from 'src/shared/chan-api/chan-api-reducers';
import boardPickerReducer, {
  BoardPickerState
} from 'src/board/board-picker/board-picker-reducer';

import { ChanAPI } from './chan-api/chan-api';

export interface RootState {
  catalog: CatalogState;
  thread: ThreadState;
  chanAPI: ChanAPI;
  boards: BoardsState;
  boardPicker: BoardPickerState;
}

const rootReducer = combineReducers({
  catalog: catalogReducer,
  thread: threadReducer,
  chanAPI: chanAPIReducer,
  boards: boardReducer,
  boardPicker: boardPickerReducer
});

export default rootReducer;
