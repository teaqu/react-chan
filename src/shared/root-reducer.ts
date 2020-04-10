import { combineReducers } from 'redux';

import catalogReducer, { CatalogState } from 'src/catalog/catalog-reducers';
import threadReducer, { ThreadState } from 'src/thread/thread-reducer';
import boardReducer, { BoardsState } from 'src/board/board-reducer';
import chanAPIReducer, {
  ChanAPIState
} from 'src/shared/chan-api/chan-api-reducers';
import boardPickerReducer, {
  BoardPickerState
} from 'src/board/board-picker/board-picker-reducer';
import postsReducer, { PostsState } from 'src/post/posts-reducer';

export interface RootState {
  catalog: CatalogState;
  thread: ThreadState;
  posts: PostsState;
  chanAPI: ChanAPIState;
  boards: BoardsState;
  boardPicker: BoardPickerState;
}

const rootReducer = combineReducers({
  catalog: catalogReducer,
  thread: threadReducer,
  posts: postsReducer,
  chanAPI: chanAPIReducer,
  boards: boardReducer,
  boardPicker: boardPickerReducer
});

export default rootReducer;
