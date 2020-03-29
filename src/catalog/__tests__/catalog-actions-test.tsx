import 'react-native';

import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { AnyAction } from 'redux';

import { RootState } from 'src/shared/root-reducer';

import * as actions from '../catalog-actions';
import { Thread } from '../thread';

import catalogResponse from './__mocks__/catalog-response.json';

const middlewares = [thunk];

describe('catalog actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action to request the catalog', () => {
    const board = 'qa';
    const expectedAction = {
      payload: board,
      type: actions.requestCatalog.type
    };
    expect(actions.requestCatalog(board)).toEqual(expectedAction);
  });

  it('should create an action to receive the catalog', () => {
    const board = 'g';
    const threads: Thread[] = catalogResponse[0].threads;
    Date.now = jest.fn(() => 1111);
    const expectedAction = {
      payload: {
        receivedAt: 1111,
        board: board,
        threads: threads
      },
      type: actions.receiveCatalog.type
    };
    expect(actions.receiveCatalog(board, threads)).toEqual(expectedAction);
  });

  it('should create an action to recive and request the catalog', async () => {
    const initialState = {
      catalog: {
        isFetching: false
      }
    };
    const mockStore = configureMockStore<
      typeof initialState,
      ThunkDispatch<RootState, any, AnyAction>
    >(middlewares);

    Date.now = jest.fn(() => 1234);
    const board = 'a';
    fetchMock.getOnce(`https://a.4cdn.org/${board}/catalog.json`, {
      body: catalogResponse,
      headers: { 'content-type': 'application/json' }
    });
    const store = mockStore(initialState);
    await store.dispatch(actions.fetchCatalogIfNeeded(board));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should not fetchCatalog if not needed', async () => {
    const initialState = {
      catalog: {
        isFetching: true
      }
    };
    const mockStore = configureMockStore<
      typeof initialState,
      ThunkDispatch<RootState, any, AnyAction>
    >(middlewares);
    const board = 'g';
    const store = mockStore(initialState);
    await store.dispatch(actions.fetchCatalogIfNeeded(board));
    expect(store.getActions()).toHaveLength(0);
  });
});
