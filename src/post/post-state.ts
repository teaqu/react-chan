/**
 * When showing a post inline as a reply, the state can differ from the original
 * post, so a post's state is stored as it's own object.
 *
 * state keys:
 * - posts: $postNo
 * - reply_links_showing: $postNo-$replyNo
 * - com_reply_links_showing: $postNo-$replyNo-[$replyIndex]
 */
export interface PostState {
  show_image: boolean;
  show_image_info: boolean;
  hidden: boolean;

  // Replies to this post
  reply_links_showing: number[];

  // Replies to show within this post
  com_reply_links_showing: ComReplyLink[];

  // Shown if the user tries to open a reply to a post that is already showing.
  red_border: boolean;
}

export interface ComReplyLink {
  no: number;

  // As some anons like to reply to the same post multiple times within a
  // single comment, the index of the inline reply is tracked so that a
  // different state is given to each.
  index: number;
}

export const initialPostState: PostState = {
  show_image: false,
  show_image_info: false,
  hidden: false,
  reply_links_showing: [],
  com_reply_links_showing: [],
  red_border: false
};

/**
 * Find a reply state within the post state tree
 *
 * @param postStateKey
 * @param replyNo
 */
export function findReplyInStateTree(
  postStateKey: string,
  replyNo: number
): string {
  const regex = new RegExp(`(.*?)${replyNo}(\\\[[0-9]*\\\])?`);
  const matches = regex.exec(postStateKey);
  if (matches) {
    return matches[0];
  }
  return '';
}
