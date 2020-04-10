import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

import { ChanAPIState } from './chan-api-reducers';

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
  trollFlag: 'https://s.4cdn.org/image/country/troll/[country].gif',
  since4pass: 'https://s.4cdn.org/image/minileaf.gif'
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

export const calcReplies = (posts: Post[]): Post[] => {
  const length = posts.length;
  const regex = />&gt;&gt;(.*?)</g;
  let matches = null;
  for (let i = 0; i < length; i++) {
    let inline_reply_links: number[] = [];
    if (posts[i].com) {
      do {
        matches = regex.exec(posts[i].com);
        if (matches) {
          inline_reply_links.push(parseInt(matches[1], 10));
        }
      } while (matches);
    }
    posts[i].inline_reply_links = inline_reply_links;
  }
  for (let i = 0; i < length; i++) {
    let replies = [];
    for (let x = i + 1; x < length; x++) {
      if (posts[x].com) {
        if (
          posts[x].inline_reply_links &&
          posts[x].inline_reply_links.includes(posts[i].no)
        ) {
          replies.push({ index: x, no: posts[x].no });
        }
      }
    }
    posts[i].reply_links = replies;
  }
  return posts;
};

export default { fetchCatalog, fetchThread, fetchBoards, calcReplies };
