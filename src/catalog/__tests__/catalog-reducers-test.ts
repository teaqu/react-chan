import { createAction } from '@reduxjs/toolkit';

import reducer from '../catalog-reducers';
import actions from '../catalog-actions';

describe('catalog reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, createAction('test'))).toEqual({
      boardId: '',
      error: '',
      isFetching: false,
      threads: {}
    });
  });

  it('should handle REQUEST_CATALOG', () => {
    expect(
      reducer(undefined, {
        type: actions.fetchCatalog.type,
        payload: 'a'
      })
    ).toEqual({ boardId: 'a', error: '', isFetching: true, threads: {} });
  });

  it('should handle RECEIVE_CATALOG', () => {
    expect(
      reducer(undefined, {
        type: actions.fetchCatalogSucceeded.type,
        payload: {
          boardId: 'a',
          error: '',
          threads: {}
        }
      })
    ).toEqual({ boardId: 'a', error: '', isFetching: false, threads: {} });
  });
});
