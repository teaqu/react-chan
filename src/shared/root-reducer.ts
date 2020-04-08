import { combineReducers } from 'redux';
import { ScaledSize } from 'react-native';

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

import screenReducer from './screen/screen-reducer';

export interface RootState {
  catalog: CatalogState;
  thread: ThreadState;
  posts: PostsState;
  chanAPI: ChanAPIState;
  boards: BoardsState;
  boardPicker: BoardPickerState;
  screen: ScaledSize;
}

const rootReducer = combineReducers({
  catalog: catalogReducer,
  thread: threadReducer,
  posts: postsReducer,
  chanAPI: chanAPIReducer,
  boards: boardReducer,
  boardPicker: boardPickerReducer,
  screen: screenReducer
});

export default rootReducer;
