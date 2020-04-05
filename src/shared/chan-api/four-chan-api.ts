import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';

import { ChanAPIState } from './chan-reducers';

type CatalogAPI = {
  page: number;
  threads: Thread[];
};

type ThreadAPI = {
  posts: Post[];
};

export const FourChanState: ChanAPIState = {
  thumbnail: 'https://i.4cdn.org/%BOARDID%/%TIM%s.jpg',
  fileDeleted: 'https://s.4cdn.org/image/filedeleted.gif'
};

export const fetchCatalog = (boardId: string): Promise<Thread[]> => {
  const url = `https://a.4cdn.org/${boardId}/catalog.json`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => error)
    .then((catalogs: CatalogAPI[]) => {
      // Normalise the catalogs into threads with their current page.
      const threads = catalogs.flatMap((catalog: CatalogAPI) => {
        return catalog.threads.map((thread: Thread) => {
          return { ...thread, page: catalog.page };
        });
      });
      return threads;
    });
};

export const fetchThread = (
  boardId: string,
  threadNo: number
): Promise<Post[]> => {
  const url = `https://a.4cdn.org/${boardId}/thread/${threadNo}.json`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => error)
    .then((thread: ThreadAPI) => thread.posts);
};

export default { fetchCatalog, fetchThread };
