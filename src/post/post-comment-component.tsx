import React, { ReactNodeArray } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reactStringReplace from 'react-string-replace';
import { Text, StyleSheet } from 'react-native';

import { RootState } from 'src/shared/root-reducer';
import commentParser from 'src/comment/comment-parser';

import { Post } from './post';
import { PostComponent } from './post-component';
import { findReplyInStateTree } from './post-state';
import postActions from './post-actions';

interface Props {
  postNo: number;
  postStateKey: string;
}
export const PostCommentComponent = React.memo(
  ({ postNo, postStateKey }: Props) => {
    const dispatch = useDispatch();
    const postState = useSelector(
      (state: RootState) => state.thread.postStates[postStateKey]
    );
    const opNo = useSelector((state: RootState) => state.thread.threadNo);

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
          const localIndex = inlineIndex;
          ++inlineIndex;
          return (
            <Text
              key={match + localIndex}
              style={[
                styles.replyLink,
                findReplyInStateTree(postStateKey, replyNo).length > 0 &&
                  styles.replyShowing,
                (postState.com_reply_links_showing.some(
                  l => l.no === replyNo
                ) &&
                  styles.inlineQuoteLink) ||
                  styles.notInlineQuoteLink
              ]}
              onPress={() => onComLinkPress(replyNo, localIndex)}
            >
              &gt;&gt;{match}
              {opNo === parseInt(match, 10) && ' (OP)'}
            </Text>
          );
        }
      );

      return nodes;
    };

    const post: Post = useSelector(
      (state: RootState) => state.thread.posts[postNo]
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
        `<a href="#p(?:${showingLinks})" class="quotelink">` +
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
            <Text key={postStateKey + commentIndex++}>
              {parseComment(
                `<a href="#p${matches[1]}" class="quotelink">` +
                  `&gt;&gt;${matches[1]}</a>`
              )}
            </Text>
          );
          comment.push(
            <PostComponent
              postNo={parseInt(matches[1], 10)}
              key={postStateKey + commentIndex++}
              postStateKey={`${postStateKey}-com-${matches[1]}[${
                inlineIndex - 1
              }]`}
            />
          );
        } else {
          // Show comment either side of the inline reply
          const trimmedComment = subComment.replace(/^<br>/, '');
          if (trimmedComment) {
            // Else append the comment as a selectable text
            comment.push(
              <Text key={postStateKey + commentIndex++}>
                {parseComment(trimmedComment)}
              </Text>
            );
          }
        }
      });
      // The comment should snow be selectable either side of the inline replies
      // without any nested views or posts within Text elements.
      return <>{comment}</>;
    } else {
      return <Text selectable>{parseComment(post.com)} </Text>;
    }
  }
);

const styles = StyleSheet.create({
  inlineQuoteLink: {
    color: '#d96d78'
  },
  notInlineQuoteLink: {
    color: '#d00'
  },
  replyShowing: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted'
  },
  replyLink: {
    textDecorationLine: 'underline'
  }
});
