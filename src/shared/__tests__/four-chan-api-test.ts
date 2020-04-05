import fetchMock from 'fetch-mock';

import { Thread } from 'src/thread/thread';

import FourChanAPI from '../chan-api/four-chan-api';

import catalogResponse from './__mocks__/catalog-response.json';

describe('catalog reducer', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should return the initial state', async () => {
    const boardId = 'a';
    fetchMock.getOnce(`https://a.4cdn.org/${boardId}/catalog.json`, {
      body: catalogResponse,
      headers: { 'content-type': 'application/json' }
    });
    const threads: Thread[] = await FourChanAPI.fetchCatalog(boardId);
    expect(threads).toMatchSnapshot();
  });
});
