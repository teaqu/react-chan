import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

import { ChanAPIState } from './chan-api-reducers';
import { Reply } from './chan-api';

interface CatalogAPI {
  page: number;
  threads: Thread[];
}

interface ThreadAPI {
  posts: Post[];
}

interface BoardAPI {
  boards: Board[];
  troll_flags: {
    [flag: string]: string;
  };
}

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

/**
 * Calculate replies for our post
 * As this must be calculated before we show can show the thread,
 * it must use as few loops and regex as possible.
 * @param posts
 */
export const calcReplies = (posts: Post[]): Post[] => {
  const length = posts.length;
  const regex = />&gt;&gt;(.*?)</g; // look for >>(postNo)
  let matches = null;
  // An associate array of replies
  let replyLinks: { [no: string]: Reply[] } = {};

  // Find all replies within each post
  for (let i = 0; i < length; i++) {
    if (posts[i].com) {
      do {
        matches = regex.exec(posts[i].com);
        if (matches) {
          // Add this post to the reply links of the post it's replying to.
          replyLinks[matches[1]] = replyLinks[matches[1]] || [];
          replyLinks[matches[1]].push({ index: i, no: posts[i].no });
        }
      } while (matches);
    }
  }

  for (let i = 0; i < length; i++) {
    posts[i].reply_links = replyLinks[posts[i].no];
  }

  return posts;
};

export default { fetchCatalog, fetchThread, fetchBoards, calcReplies };
