import { createAction } from '@reduxjs/toolkit';

import catalogResponse from 'src/shared/__tests__/__mocks__/catalog-response.json';

import reducer from '../catalog-reducers';
import actions from '../catalog-actions';

describe('catalog reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, createAction('test'))).toEqual({
      boardId: '',
      error: '',
      isFetching: false,
      threads: []
    });
  });

  it('should handle REQUEST_CATALOG', () => {
    expect(
      reducer(undefined, {
        type: actions.fetchCatalog.type,
        payload: 'a'
      })
    ).toEqual({ boardId: 'a', error: '', isFetching: true, threads: [] });
  });

  it('should handle RECEIVE_CATALOG', () => {
    const threads = catalogResponse[1].threads;
    expect(
      reducer(undefined, {
        type: actions.fetchCatalogSucceeded.type,
        payload: {
          boardId: 'a',
          error: '',
          threads: threads
        }
      })
    ).toEqual({ boardId: 'a', error: '', isFetching: false, threads: threads });
  });
});
