import 'react-native';

import fetchMock from 'fetch-mock';

import actions from '../catalog-actions';

describe('catalog actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action to fetch the catalog', () => {
    const board = 'qa';
    const expectedAction = {
      payload: board,
      type: actions.fetchCatalog.type
    };
    expect(actions.fetchCatalog(board)).toEqual(expectedAction);
  });

  it('should create an action to receive the catalog', () => {
    const board = 'g';
    Date.now = jest.fn(() => 1111);
    const expectedAction = {
      payload: {
        receivedAt: 1111,
        boardId: board,
        threads: {}
      },
      type: actions.fetchCatalogSucceeded.type
    };
    expect(actions.fetchCatalogSucceeded(board, {})).toEqual(expectedAction);
  });
});
