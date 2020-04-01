import { Thread } from 'src/thread/thread';
import { Post } from 'src/post/post';

export interface ChanAPI {
  fetchCatalog(boardId: string): Promise<Thread[]>;
  fetchThread(boardId: string, threadNo: number): Promise<Post[]>;
}
