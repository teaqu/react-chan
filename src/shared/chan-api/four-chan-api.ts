import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

import { ChanAPIState } from './chan-api-reducers';
import { Posts, Threads } from './chan-api';

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

export const fetchCatalog = (boardId: string): Promise<Threads> => {
  const uri = `https://a.4cdn.org/${boardId}/catalog.json`;
  return fetch(uri)
    .then(response => response.json())
    .catch(error => error)
    .then((catalogs: CatalogAPI[]) =>
      // Normalise the catalogs into threads with their current page.
      catalogs.flatMap((catalog: CatalogAPI) =>
        catalog.threads.map((thread: Thread) => ({
          ...thread,
          page: catalog.page
        }))
      )
    )
    .then(threads =>
      threads.reduce(
        (acc, curr) => ({ ...acc, [curr.no.toString()]: curr }),
        {}
      )
    );
};

export const fetchThread = (
  boardId: string,
  threadNo: number
): Promise<Posts> => {
  const uri = `https://a.4cdn.org/${boardId}/thread/${threadNo}.json`;
  return fetch(uri)
    .then(response => response.json())
    .catch(error => error)
    .then((thread: ThreadAPI) => thread.posts)
    .then(posts =>
      // Set posts array to no => post key value object
      posts.reduce((acc, curr) => ({ ...acc, [curr.no]: { ...curr } }), {})
    );
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
export const calcReplies = (posts: Posts): Posts => {
  const regex = /class="quotelink">&gt;&gt;(.*?)</g; // look for >>(postNo)
  let matches = null;
  // Find all replies within each post
  for (let no in posts) {
    posts[no].reply_links = [];
    do {
      matches = regex.exec(posts[no].com);
      if (matches) {
        const match = parseInt(matches[1], 10);

        // Add this post to the reply links of the post it's replying to.
        if (posts[match]) {
          posts[match].reply_links.push(posts[no].no);
        }
      }
    } while (matches);
  }
  return posts;
};

export default { fetchCatalog, fetchThread, fetchBoards, calcReplies };
