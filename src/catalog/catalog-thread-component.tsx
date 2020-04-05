import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { CommentComponent } from 'src/comment/comment-component';

import { Thread } from '../thread/thread';

/**
 * Rendering a thread in the catalog
 */
type Props = { thread: Thread };
export const CatalogThreadComponent = React.memo((props: Props) => {
  const thread = props.thread;
  const navigation = useNavigation();
  return (
    <View style={styles.thread}>
      <View style={styles.tn_container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Thread', {
              boardId: 'a',
              threadNo: thread.no
            });
          }}
        >
          <Image
            source={{ uri: 'https://i.4cdn.org/a/' + thread.tim + 's.jpg' }}
            style={{ height: thread.tn_h / 2 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
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
  tn_container: {
    elevation: 3,
    backgroundColor: '#eef2ff',
    width: '100%',
    marginBottom: 2
  }
});
