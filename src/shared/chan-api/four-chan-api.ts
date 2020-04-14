import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

import { ChanAPI, ReplyLinks } from './chan-api';
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

const thumbnail = 'https://i.4cdn.org/[board]/[tim]s.jpg';
const image = 'https://i.4cdn.org/[board]/[tim]';
const fileDeleted = 'https://s.4cdn.org/image/filedeleted.gif';
const flag = 'https://s.4cdn.org/image/country/[country].gif';
const trollFlag = 'https://s.4cdn.org/image/country/troll/[country].gif';
const since4pass = 'https://s.4cdn.org/image/minileaf.gif';

const fetchCatalog = (boardId: string): Promise<Threads> => {
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
    .then(threads => {
      return threads.reduce((acc, curr) => ({ ...acc, [curr.no]: curr }), {});
    });
};

const fetchThread = (boardId: string, threadNo: number): Promise<Posts> => {
  const uri = `https://a.4cdn.org/${boardId}/thread/${threadNo}.json`;
  return fetch(uri)
    .then(response => response.json())
    .catch(error => error)
    .then((thread: ThreadAPI) => thread.posts)
    .then(posts =>
      // Set posts array to no => post key value object
      posts.reduce((acc, curr) => ({ ...acc, [curr.no]: curr }), {})
    );
};

const fetchBoards = (): Promise<Board[]> => {
  const uri = 'https://a.4cdn.org/boards.json';
  return fetch(uri)
    .then(response => response.json())
    .catch(error => error)
    .then((api: BoardAPI) => api.boards);
};

/**
 * Calculate replies for our post
 *
 * @param posts
 * @param postStates
 */
const calcReplies = (posts: Posts): ReplyLinks => {
  const regex = /class="quotelink">&gt;&gt;(.*?)</g; // look for >>(postNo)
  let matches = null;
  let reply_links: ReplyLinks = {};

  // Find all replies within each post
  for (let no in posts) {
    reply_links[no] = [];
    do {
      matches = regex.exec(posts[no].com);
      if (matches) {
        const match = parseInt(matches[1], 10);

        // Add this post to the reply links of the post it's replying to.
        if (posts[match]) {
          reply_links[match].push(posts[no].no);
        }
      }
    } while (matches);
  }
  return reply_links;
};

const fourChanAPI: ChanAPI = {
  thumbnail,
  image,
  fileDeleted,
  flag,
  trollFlag,
  since4pass,
  fetchCatalog,
  fetchThread,
  fetchBoards,
  calcReplies
};
export default fourChanAPI;
