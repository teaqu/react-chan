export interface Thread {
  no: number;
  now: string;
  name: string;
  sub?: string;
  com: string;
  filename: string;
  ext: string;
  w: number;
  h: number;
  tn_w: number;
  tn_h: number;
  tim?: number;
  time: number;
  md5: string;
  fsize: number;
  resto: number;
  bumplimit: number;
  imagelimit: number;
  semantic_url: string;
  custom_spoiler: number;
  replies: number;
  images: number;
  omitted_posts: number;
  omitted_images: number;
  last_replies: Reply[];
  last_modified: number;
  page?: number;
}

interface Reply {
  no: number;
  now: string;
  name: string;
  com: string;
  time: number;
  resto: number;
}
