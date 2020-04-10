import { Reply } from 'src/shared/chan-api/chan-api';

export interface Post {
  no: number;
  sticky: number;
  closed: number;
  country: string;
  country_name: string;
  now: string;
  name: string;
  sub: string;
  com: string;
  filename: string;
  ext: string;
  w: number;
  h: number;
  tn_w: number;
  tn_h: number;
  trip: string;
  tim: number;
  time: number;
  troll_country: string;
  md5: string;
  fsize: number;
  resto: number;
  capcode: string;
  semantic_url: string;
  since4pass: number;
  replies: number;
  id: string;
  images: number;
  unique_ips: number;

  // Post state
  show_image: boolean;
  show_image_info: boolean;

  // Replies to this post
  reply_links: Reply[];
  reply_links_showing: number[];

  // posts this post is replying to
  com_replies: number[];

  index: number;
  hidden: boolean;
}
