import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { CommentComponent } from 'src/comment/comment-component';

import { Thread } from '../thread/thread';

/**
 * Rendering a thread in the catalog
 */
type Props = { thread: Thread };
export const CatalogThreadComponent = React.memo((props: Props) => {
  const thread = props.thread;
  return (
    <View style={styles.thread}>
      {(thread.tim && (
        <Image
          source={{ uri: 'https://i.4cdn.org/a/' + thread.tim + 's.jpg' }}
          style={[
            { height: thread.tn_h / 2, width: thread.tn_w / 2 },
            styles.thumbnail
          ]}
          resizeMode="contain"
        />
      )) || (
        <Image
          source={{ uri: 'https://s.4cdn.org/image/filedeleted.gif' }}
          style={[styles.file_deleted, styles.thumbnail]}
          resizeMode="contain"
        />
      )}
      <Text style={styles.stats}>
        {thread.replies} / {thread.images} / {thread.page}
      </Text>
      {thread.sub && <Text style={styles.sub}>{thread.sub}</Text>}
      {thread.com && <CommentComponent comment={thread.com} />}
    </View>
  );
});

const styles = StyleSheet.create({
  thread: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  sub: {
    fontWeight: 'bold',
    color: '#0f0c5d',
    textAlign: 'center'
  },
  stats: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  file_deleted: {
    height: 10,
    margin: 10,
    width: '100%'
  },
  thumbnail: {
    maxWidth: '100%',
    borderColor: '#D6DAF0',
    borderWidth: 1
  }
});
