import rnTextSize, { TSFontSpecs } from 'react-native-text-size';
import { Dimensions } from 'react-native';
import { AllHtmlEntities } from 'html-entities';

import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

import imageUtils from '../utils/image-utils';

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

const calcReplies = (posts: Posts): ReplyLinks => {
  const regex = /class="quotelink">&gt;&gt;(.*?)</g; // look for >>(postNo)
  let matches = null;
  let reply_links: ReplyLinks = {};

  // Find all replies within each post
  Object.keys(posts).forEach(no => {
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
  });
  return reply_links;
};

const calcHeights = async (posts: Posts): Promise<number[]> => {
  // Default font specs
  const fontSpecs: TSFontSpecs = {
    fontSize: 14
  };
  const entities = new AllHtmlEntities();
  const texts: (string | null)[] = Object.values(posts).map(p => {
    if (!p.com) {
      return null;
    }
    // Remove HTML so that it doesn't influence height.
    const newCom = p.com
      .replace(/<br>/g, '\n')
      .replace(/<wbr>/g, '\u200B')
      .replace(/<(\/)?a(.*?)>/g, '')
      .replace(/<(\/)?span(.*?)>/g, '')
      .replace(/<(\/)?s>/g, '');
    return entities.decode(newCom);
  });

  // Generate links
  const linkTexts: (string | null)[] = Object.values(posts).map(
    p =>
      p.reply_links
        .map(l => l + ' ')
        .toString()
        .replace(/,([0-9]*?)/g, '>>')
        .replace(/^(?!$)/g, '>>') || null
  );

  const nameTexts: string[] = Object.values(posts).map(p => {
    if (p.trip) {
      return p.name + ' ' + p.trip;
    } else {
      return p.name;
    }
  });

  const postWidth = Dimensions.get('screen').width - 12;

  // Width of text
  const textWidth = postWidth - 10;
  const textHeights = await rnTextSize.flatHeights({
    text: texts,
    width: textWidth,
    ...fontSpecs
  });

  // Width of texts if post image is present.
  const widthWithImage = postWidth - 95;
  const textHeightsWithImage = await rnTextSize.flatHeights({
    text: texts,
    width: widthWithImage,
    ...fontSpecs
  });

  // Calculate the height of names with postWidth - (width of date + post no).
  const nameWidth = postWidth - 255;
  const nameHeights = await rnTextSize.flatHeights({
    text: nameTexts,
    width: nameWidth,
    fontSize: 13,
    fontWeight: '700'
  });

  // Calculate the height of names if full width.
  const nameHeightsFullWidth = await rnTextSize.flatHeights({
    text: nameTexts,
    width: textWidth,
    fontSize: 13,
    fontWeight: '700'
  });

  // Calculate height of links
  const linkWidth = postWidth - 6;
  const linkHeights = await rnTextSize.flatHeights({
    text: linkTexts,
    width: linkWidth,
    fontSize: 13
  });

  // Calculate height of each post by adding calculated heights
  const postArr = Object.values(posts);
  const heights: number[] = [];
  for (let i = 0; i < postArr.length; ++i) {
    const post = postArr[i];
    heights[i] = textHeights[i];
    if (post.tim) {
      // Add the height of image unless the text is longer.
      heights[i] = Math.max(
        imageUtils.calculateAspectRatio(post.tn_w, post.tn_h, 80).height + 18,
        textHeightsWithImage[i]
      );
    }
    if (linkHeights[i]) {
      heights[i] += linkHeights[i] + 7 || 0;
    }
    if (nameHeights[i] / 18 > 1) {
      heights[i] += nameHeightsFullWidth[i];
      heights[i] += 18;
    } else {
      heights[i] += nameHeights[i];
    }
    heights[i] += 8; // header height padding
    heights[i] += 10.5; // padding

    if (post.country || post.id) {
      heights[i] += 17;
    }
  }
  return heights;
};

const genImageURI = (boardId: string, tim: number, ext: string): string => {
  return (
    image.replace('[board]', boardId).replace('[tim]', tim.toString()) + ext
  );
};

const genThumbnailUri = (boardId: string, tim: number): string => {
  return thumbnail.replace('[board]', boardId).replace('[tim]', tim.toString());
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
  calcReplies,
  calcHeights,
  genImageURI,
  genThumbnailUri
};
export default fourChanAPI;
