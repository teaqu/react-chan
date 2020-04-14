import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';
import { PostState } from 'src/post/post-state';

// So we can support more image boards in the future...
export interface ChanAPI {
  thumbnail: string;
  image: string;
  fileDeleted: string;
  flag: string;
  trollFlag: string;
  since4pass: string;
  fetchCatalog(boardId: string): Promise<Threads>;
  fetchThread(boardId: string, threadNo: number): Promise<Posts>;
  fetchBoards(): Promise<Board[]>;
  calcReplies(posts: Posts): ReplyLinks;
}

export interface Posts {
  [no: string]: Post;
}

export interface PostStates {
  [no: string]: PostState;
}

export interface Threads {
  [no: string]: Thread;
}

export interface ReplyLinks {
  [no: string]: number[];
}
