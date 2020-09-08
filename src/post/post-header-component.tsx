import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { RootState } from 'src/shared/root-reducer';

import { Post } from './post';
import postActions from './post-actions';

interface Props {
  postNo: number;
}
export const PostHeaderComponent = React.memo(({ postNo }: Props) => {
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.posts.posts[postNo]);
  const flagURI = useSelector((state: RootState) => state.chanAPI.flag);
  const listRef: FlatList<Post> | null = useSelector(
    (state: RootState) => state.thread.listRef
  );
  const since4passURI = useSelector(
    (state: RootState) => state.chanAPI.since4pass
  );
  const trollFlagURI = useSelector(
    (state: RootState) => state.chanAPI.trollFlag
  );

  return (
    <View style={styles.postHeader}>
      <View style={styles.headerFlex}>
        <Text style={styles.name}>{post.name}</Text>
        {post.trip && <Text style={styles.trip}>!{post.trip}</Text>}
        {post.since4pass && (
          <FastImage
            source={{
              uri: since4passURI
            }}
            style={styles.capCode}
          />
        )}
        <View style={styles.rightAlign}>
          <Text style={styles.dateNo}>
            {post.now} No.{post.no}
          </Text>
          <Text
            style={styles.jumpTo}
            onPress={() => {
              if (listRef) {
                dispatch(postActions.jumpToPost(postNo.toString()));
                listRef.scrollToItem({ item: post, animated: true });
              }
            }}
          >
            #
          </Text>
        </View>
      </View>
      <View style={styles.headerFlex}>
        {post.country && (
          <FastImage
            source={{
              uri: flagURI.replace('[country]', post.country.toLowerCase())
            }}
            style={styles.flag}
          />
        )}
        {post.troll_country && (
          <FastImage
            source={{
              uri: trollFlagURI.replace(
                '[country]',
                post.troll_country.toLowerCase()
              )
            }}
            style={styles.flag}
          />
        )}
        {post.country_name && <Text>{post.country_name}</Text>}
        {post.id && (
          <Text
            style={[
              styles.id,
              {
                // The id is used to calculate a colour so that we don't have
                // to maintain a list of colours and their corresponding ids.
                backgroundColor: `rgb(
                  ${post.id.charCodeAt(0) + post.id.charCodeAt(1)},
                  ${post.id.charCodeAt(2) + post.id.charCodeAt(3)},
                  ${post.id.charCodeAt(4) + post.id.charCodeAt(5)}
                )`
              }
            ]}
          >
            ID: {post.id}
          </Text>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  flag: {
    height: 11,
    width: 16,
    marginRight: 5
  },
  id: {
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 10,
    marginLeft: 'auto',
    borderRadius: 2
  },
  rightAlign: {
    marginLeft: 'auto',
    flexDirection: 'row',
    width: 240,
    alignItems: 'center'
  },
  dateNo: {
    marginLeft: 'auto',
    fontSize: 12
  },
  capCode: {
    height: 14,
    width: 14,
    marginLeft: 2
  },
  postHeader: {
    padding: 5,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#c9cde8',
    borderColor: '#b7c5d9',
    borderBottomWidth: 1
  },
  headerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  name: {
    color: '#117743',
    fontSize: 13,
    fontWeight: '700'
  },
  trip: {
    color: '#117743',
    paddingLeft: 5
  },
  jumpTo: {
    color: '#34345c',
    fontWeight: 'bold',
    paddingLeft: 5
  }
});
