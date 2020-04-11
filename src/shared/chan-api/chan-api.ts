import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';
import { Board } from 'src/board/board';

// So we can support more image boards in the future...
export interface ChanAPI {
  fetchCatalog(boardId: string): Promise<Thread[]>;
  fetchThread(boardId: string, threadNo: number): Promise<Post[]>;
  fetchBoards(): Promise<Board[]>;
  calcReplies(posts: Post[]): Reply[];
}

export interface Reply {
  index: number;
  no: number;
}
