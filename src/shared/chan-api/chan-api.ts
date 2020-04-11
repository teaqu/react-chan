import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

// So we can support more image boards in the future...
export interface ChanAPI {
  fetchCatalog(boardId: string): Promise<Threads>;
  fetchThread(boardId: string, threadNo: number): Promise<Posts>;
  fetchBoards(): Promise<Board[]>;
  calcReplies(posts: Posts): Posts;
}

export interface Posts {
  [no: string]: Post;
}

export interface Threads {
  [no: string]: Thread;
}
