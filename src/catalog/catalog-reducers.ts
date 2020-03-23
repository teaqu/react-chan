import { Thread } from './thread';
import {
  REQUEST_CATALOG,
  RECEIVE_CATALOG,
  CatalogActionTypes
} from './catalog-actions';

export interface CatalogState {
  isFetching: boolean;
  threads: Thread[];
}

const initialState: CatalogState = {
  isFetching: false,
  threads: []
};

export default function catalogReducer(
  state = initialState,
  action: CatalogActionTypes
): CatalogState {
  switch (action.type) {
    case REQUEST_CATALOG:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_CATALOG:
      return Object.assign({}, state, {
        isFetching: false,
        threads: action.threads
      });
    default:
      return state;
  }
}
