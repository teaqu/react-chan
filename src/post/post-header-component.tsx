import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from 'src/shared/root-reducer';

import { Post } from './post';

type Props = { post: Post };
export const PostHeaderComponent = (props: Props) => {
  const post = props.post;
  const flagURI = useSelector((state: RootState) => state.chanAPI.flag);
  const trollFlagURI = useSelector(
    (state: RootState) => state.chanAPI.trollFlag
  );
  const op = post.replies !== undefined;

  return (
    <View style={[styles.post_header, op && styles.op_header]}>
      <View style={styles.header_flex}>
        <Text style={styles.name}>{post.name}</Text>
        {post.trip && <Text>!{post.trip}</Text>}
        {post.since4pass && (
          <Image
            source={{
              uri: 'https://s.4cdn.org/image/minileaf.gif'
            }}
            style={styles.capCode}
          />
        )}
        <Text style={styles.date_no}>
          {post.now} No.{post.no}
        </Text>
      </View>
      <View style={styles.header_flex}>
        {post.country && (
          <Image
            source={{
              uri: flagURI.replace('[country]', post.country.toLowerCase())
            }}
            style={styles.flag}
          />
        )}
        {post.troll_country && (
          <Image
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
};

const styles = StyleSheet.create({
  flag: {
    height: 11,
    width: 16,
    marginRight: 5
  },
  op_header: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  id: {
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 10,
    marginLeft: 'auto',
    borderRadius: 2
  },
  date_no: {
    marginLeft: 'auto',
    fontSize: 12
  },
  capCode: {
    height: 14,
    width: 14,
    marginLeft: 2
  },
  post_header: {
    padding: 5,
    backgroundColor: '#c9cde8'
  },
  header_flex: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  name: {
    color: '#117743',
    fontWeight: '700'
  }
});
