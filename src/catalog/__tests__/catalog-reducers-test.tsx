import { createAction } from '@reduxjs/toolkit';

import reducer from '../catalog-reducers';
import { requestCatalog, receiveCatalog } from '../catalog-actions';

import catalogResponse from './__mocks__/catalog-response.json';

describe('catalog reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, createAction('test'))).toEqual({
      board: '',
      isFetching: false,
      threads: []
    });
  });

  it('should handle REQUEST_CATALOG', () => {
    expect(
      reducer(undefined, {
        type: requestCatalog.type,
        payload: 'a'
      })
    ).toEqual({ board: 'a', isFetching: true, threads: [] });
  });

  it('should handle RECEIVE_CATALOG', () => {
    const threads = catalogResponse[1].threads;
    expect(
      reducer(undefined, {
        type: receiveCatalog.type,
        payload: {
          board: 'a',
          threads: threads
        }
      })
    ).toEqual({ board: 'a', isFetching: false, threads: threads });
  });
});
