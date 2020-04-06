export interface Board {
  board: string;
  title: string;
  ws_board: number;
  per_page: number;
  pages: number;
  max_filesize: number;
  max_webm_filesize: number;
  max_comment_chars: number;
  max_webm_duration: number;
  bump_limit: number;
  image_limit: number;
  cooldowns: {
    threads: number;
    replies: number;
    images: number;
  };
  meta_description: string;
  spoilers: number;
  custom_spoilers: number;
  is_archived: number;
}
