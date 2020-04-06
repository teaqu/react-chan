import { combineReducers } from 'redux';

import catalogReducer, { CatalogState } from 'src/catalog/catalog-reducers';
import threadReducuer, { ThreadState } from 'src/thread/thread-reducuer';
import boardReducer, { BoardsState } from 'src/board/board-reducer';
import chanAPIReducer, {
  ChanAPIState
} from 'src/shared/chan-api/chan-reducers';
import boardPickerReducer, {
  BoardPickerState
} from 'src/board/board-picker/board-picker-reducer';

export interface RootState {
  catalog: CatalogState;
  thread: ThreadState;
  chanAPI: ChanAPIState;
  boards: BoardsState;
  boardPicker: BoardPickerState;
}

const rootReducer = combineReducers({
  catalog: catalogReducer,
  thread: threadReducuer,
  chanAPI: chanAPIReducer,
  boards: boardReducer,
  boardPicker: boardPickerReducer
});

export default rootReducer;
