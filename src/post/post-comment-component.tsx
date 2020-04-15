import React, { ReactNodeArray } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectableText } from '@astrocoders/react-native-selectable-text';
import reactStringReplace from 'react-string-replace';
import { Text, StyleSheet } from 'react-native';

import { RootState } from 'src/shared/root-reducer';
import commentParser from 'src/comment/comment-parser';

import { Post } from './post';
import { PostComponent } from './post-component';
import postActions from './post-actions';
import { findReplyInStateTree } from './post-state';

interface Props {
  postNo: number;
  postStateKey: string;
}
export const PostCommentComponent = React.memo(
  ({ postNo, postStateKey }: Props) => {
    const dispatch = useDispatch();
    const postState = useSelector(
      (state: RootState) => state.posts.postStates[postStateKey]
    );
    const onComLinkPress = (replyNo: number, replyIndex: number) => {
      dispatch(postActions.toggleComReply(postStateKey, replyNo, replyIndex));
    };

    // Used to keep track of the index of inline comment replies
    let inlineIndex = 0;

    const parseComment = (comment: string): ReactNodeArray => {
      let nodes = commentParser(comment)
        .spoilers()
        .quotes()
        .deadLinks()
        .getNodes();

      // Replace comment quote links
      nodes = reactStringReplace(
        nodes,
        /<a href=".*?" class="quotelink">>>(.*?)<\/a>/,
        match => {
          const replyNo = parseInt(match, 10);
          let localIndex = inlineIndex;
          ++inlineIndex;
          return (
            <Text
              key={match + localIndex}
              style={[
                styles.quoteLink,
                findReplyInStateTree(postStateKey, replyNo).length > 0 &&
                  styles.replyShowing,
                postState.reply_links_showing.includes(replyNo) &&
                  styles.inlineQuoteLink
              ]}
              onPress={() => onComLinkPress(replyNo, localIndex)}
            >
              >>{match}
            </Text>
          );
        }
      );

      return nodes;
    };

    const post: Post = useSelector(
      (state: RootState) => state.posts.posts[postNo]
    );

    // Split up the comment if inline replies need to be shown.
    // This is done as views cannot be placed within Text on android,
    if (postState.com_reply_links_showing.length) {
      // Get the post ids of the inline replies
      const showingLinks = postState.com_reply_links_showing
        .map(value => value.no)
        .join('|');

      // Split the comment on inline quote links that need to show a post.
      const regex = new RegExp(
        `<a href=\"#p(?:${showingLinks})\" class=\"quotelink\">` +
          `(&gt;&gt;(?:${showingLinks}))</a>`
      );
      const subComments = post.com.split(regex).filter(c => c);

      // Loop through the split comment
      const comment: Element[] = []; // new comment to build
      let commentIndex = 0; // to give each subComment a unique key
      subComments.map(subComment => {
        const matches = subComment.match(/^&gt;&gt;(.*?)$/);
        // Show the inline reply
        if (matches) {
          comment.push(
            <SelectableText
              menuItems={['Quote']}
              key={postStateKey + commentIndex++}
              value={parseComment(
                `<a href="#p${matches[1]}" class=\"quotelink\">` +
                  `&gt;&gt;${matches[1]}</a>`
              )}
            />
          );
          comment.push(
            <PostComponent
              postNo={parseInt(matches[1], 10)}
              key={postStateKey + commentIndex++}
              postStateKey={`${postStateKey}-com-${matches[1]}[${inlineIndex -
                1}]`}
            />
          );
        } else {
          // Show comment either side of the inline reply
          const trimmedComment = subComment.replace(/^<br>/, '');
          if (trimmedComment) {
            // Else append the comment as a selectable text
            comment.push(
              <SelectableText
                menuItems={['Quote']}
                key={postStateKey + commentIndex++}
                value={parseComment(trimmedComment)}
              />
            );
          }
        }
      });
      // The comment should snow be selectable either side of the inline replies
      // without any nested views or posts within Text elements.
      return <>{comment}</>;
    } else {
      return (
        <SelectableText menuItems={['Quote']} value={parseComment(post.com)} />
      );
    }
  }
);

const styles = StyleSheet.create({
  quoteLink: {
    color: '#d00'
  },
  inlineQuoteLink: {
    color: 'rgba(221, 0, 0, .2)'
  },
  replyShowing: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed'
  }
});
