import React from 'react';
import reactStringReplace from 'react-string-replace';
import { Text, StyleSheet } from 'react-native';
import { AllHtmlEntities } from 'html-entities';

import { SpoilerComponent } from 'src/comment/spoiler-component';

type Props = { html: string };
export const HTMLComponent = (props: Props) => {
  const entities = new AllHtmlEntities();
  let html = entities.decode(props.html);

  let node = reactStringReplace(html, '<br>', () => <Text>{'\n'}</Text>);

  // Quote links
  node = reactStringReplace(
    node,
    /<a href=".*?" class="quotelink">(.*?)<\/a>/,
    match => (
      <Text
        style={styles.quoteLink}
        onPress={() => {
          console.log('quote');
        }}
      >
        {match}
      </Text>
    )
  );

  // Dead quote links
  node = reactStringReplace(
    node,
    /<span class="deadlink">(.*?)<\/span>/,
    match => <Text style={styles.quoteLink}>{match} (Dead)</Text>
  );

  // Quotes
  node = reactStringReplace(
    node,
    /<span class="quote">(.*?)<\/span>/,
    match => <Text style={styles.quote}>{match}</Text>
  );

  // Spoilers
  node = reactStringReplace(node, /<s>(.*?)<\/s>/, match => (
    <SpoilerComponent spoiler={match} />
  ));

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
