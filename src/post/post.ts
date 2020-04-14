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

  // The list of replies to this post which must be calculated.
  reply_links: number[];
}
