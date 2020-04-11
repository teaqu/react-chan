import React, { ReactNodeArray } from 'react';
import reactStringReplace from 'react-string-replace';
import { Text, StyleSheet } from 'react-native';
import { AllHtmlEntities } from 'html-entities';

import { SpoilerComponent } from 'src/comment/spoiler-component';

interface Props {
  html: string;
  // Additional comment operations
  additional?: (node: ReactNodeArray) => ReactNodeArray;
}

/**
 * Render HTML comments.
 * As the comment html is usually very predictable, simple regex is used to
 * reduce execution time.
 */
export const CommentComponent = ({ html }: Props) => {
  const entities = new AllHtmlEntities();
  let comment = entities.decode(html);

  // Convert <br> to a new line
  comment = comment.replace(/<br>/g, '\n');

  // Convert Spoilers
  // This must be run first as it needs to search the entire comment
  let node = reactStringReplace(comment, /<s>(.*?)<\/s>/, (match, i) => (
    <SpoilerComponent key={match + i} spoiler={match} />
  ));

  // Convert quote links
  node = reactStringReplace(
    node,
    /<a href=".*?" class="quotelink">(.*?)<\/a>/,
    (match, i) => (
      <Text
        key={match + i}
        style={styles.quoteLink}
        onPress={() => {
          console.log('quote');
        }}
      >
        {match}
      </Text>
    )
  );

  // Convert dead quote links
  node = reactStringReplace(
    node,
    /<span class="deadlink">(.*?)<\/span>/,
    (match, i) => (
      <Text key={match + i} style={styles.quoteLink}>
        {match} (Dead)
      </Text>
    )
  );

  // Convert quotes
  node = reactStringReplace(
    node,
    /<span class="quote">(.*?)<\/span>/,
    (match, i) => (
      <Text key={match + i} style={styles.quote}>
        {match}
      </Text>
    )
  );

  return <Text>{node}</Text>;
};

const styles = StyleSheet.create({
  quote: {
    color: '#789922'
  },
  quoteLink: {
    color: '#d00'
  }
});
