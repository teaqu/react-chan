import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

import { ChanAPIState } from './chan-reducers';

type CatalogAPI = {
  page: number;
  threads: Thread[];
};

type ThreadAPI = {
  posts: Post[];
};

type BoardAPI = {
  boards: Board[];
  troll_flags: {
    [flag: string]: string;
  };
};

export const FourChanState: ChanAPIState = {
  thumbnail: 'https://i.4cdn.org/[board]/[tim]s.jpg',
  image: 'https://i.4cdn.org/[board]/[tim]',
  fileDeleted: 'https://s.4cdn.org/image/filedeleted.gif',
  flag: 'https://s.4cdn.org/image/country/[country].gif',
  trollFlag: 'https://s.4cdn.org/image/country/troll/[country].gif'
};

export const fetchCatalog = (boardId: string): Promise<Thread[]> => {
  const uri = `https://a.4cdn.org/${boardId}/catalog.json`;
  return fetch(uri)
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
  const uri = `https://a.4cdn.org/${boardId}/thread/${threadNo}.json`;
  return fetch(uri)
    .then(response => response.json())
    .catch(error => error)
    .then((thread: ThreadAPI) => thread.posts);
};

export const fetchBoards = (): Promise<Board[]> => {
  const uri = 'https://a.4cdn.org/boards.json';
  return fetch(uri)
    .then(response => response.json())
    .catch(error => error)
    .then((api: BoardAPI) => api.boards);
};

export default { fetchCatalog, fetchThread, fetchBoards };
