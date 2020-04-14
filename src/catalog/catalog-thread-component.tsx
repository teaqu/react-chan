import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AllHtmlEntities } from 'html-entities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { RootState } from 'src/shared/root-reducer';
import imageUtils from 'src/shared/utils/image-utils';

import { CatalogCommentComponent } from './catalog-comment-component';

/**
 * For Rendering a thread within the catalog
 */
interface Props {
  boardId: string;
  threadNo: number;
}
export const CatalogThreadComponent = React.memo(
  ({ boardId, threadNo }: Props) => {
    const entities = new AllHtmlEntities();
    const navigation = useNavigation();

    const thread = useSelector(
      (state: RootState) => state.catalog.threads[threadNo]
    );
    const thumbnailURI = useSelector(
      (state: RootState) => state.chanAPI.thumbnail
    );
    const fileDeletedURI = useSelector(
      (state: RootState) => state.chanAPI.fileDeleted
    );

    // Scale our images to fit within the list of threads
    const { tn_w, tn_h } = thread;
    const image = imageUtils.calculateAspectRatio(tn_w, tn_h, 100, 150);

    return (
      <View style={styles.thread}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Thread', {
              boardId: boardId,
              threadNo: thread.no
            });
          }}
        >
          {(thread.tim && (
            <FastImage
              source={{
                uri: thumbnailURI
                  .replace('[board]', boardId)
                  .replace('[tim]', thread.tim.toString())
              }}
              style={[
                { height: image.height, width: image.width },
                styles.thumbnail
              ]}
              resizeMode="contain"
            />
          )) || (
            // If no image found, show the file deleted image instead
            <FastImage
              source={{ uri: fileDeletedURI }}
              style={[styles.thumbnail, styles.file_deleted]}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.stats}>
          {thread.replies} / {thread.images} / {thread.page}
        </Text>
        {thread.sub && (
          <Text selectable={true} key={thread.no + 'sub'} style={styles.sub}>
            {entities.decode(thread.sub)}
          </Text>
        )}
        {thread.com && <CatalogCommentComponent comment={thread.com} />}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  thread: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: 270,
    overflow: 'hidden'
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
    width: 100,
    maxWidth: '100%'
  },
  thumbnail: {
    borderColor: '#D6DAF0',
    borderWidth: 1
  }
});
