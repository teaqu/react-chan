import 'react-native';

import fetchMock from 'fetch-mock';

import catalogResponse from 'src/shared/__tests__/__mocks__/catalog-response.json';

import actions from '../catalog-actions';
import { Thread } from '../../thread/thread';

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
    const threads: Thread[] = catalogResponse[0].threads;
    Date.now = jest.fn(() => 1111);
    const expectedAction = {
      payload: {
        receivedAt: 1111,
        boardId: board,
        threads: threads
      },
      type: actions.fetchCatalogSucceeded.type
    };
    expect(actions.fetchCatalogSucceeded(board, threads)).toEqual(
      expectedAction
    );
  });
});
