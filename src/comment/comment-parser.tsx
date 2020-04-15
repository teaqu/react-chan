import React, { ReactNodeArray } from 'react';
import reactStringReplace from 'react-string-replace';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { AllHtmlEntities } from 'html-entities';

import { SpoilerComponent } from './spoiler-component';

/**
 * Cascading comment parser for shared parser logic.
 *
 * As the comment html is usually very predictable, simple regex is used to
 * reduce execution time.
 */
interface Parser {
  getNodes(): ReactNodeArray;
  spoilers(): Parser;
  deadLinks(): Parser;
  quotes(): Parser;
  quoteLinks(onPress?: (replyNo: number, replyIndex: number) => void): Parser;
}

export default function(comment: string): Parser {
  let nodes: ReactNodeArray;

  const parser: Parser = {
    getNodes(): ReactNodeArray {
      return nodes;
    },
    spoilers(): Parser {
      nodes = reactStringReplace(nodes, /<s>(.*?)<\/s>/, (match, i) => (
        <SpoilerComponent key={match + i} spoiler={match} />
      ));
      return parser;
    },
    deadLinks(): Parser {
      nodes = reactStringReplace(
        nodes,
        /<span class="deadlink">(.*?)<\/span>/,
        (match, i) => (
          <Text key={match + i} style={styles.quoteLink}>
            {match} (Dead)
          </Text>
        )
      );
      return parser;
    },
    quotes(): Parser {
      nodes = reactStringReplace(
        nodes,
        /<span class="quote">(.*?)<\/span>/,
        (match, i) => (
          <Text key={match + i} style={styles.quote}>
            {match}
          </Text>
        )
      );
      return parser;
    },
    quoteLinks(
      onPress?: (replyNo: number, replyIndex: number) => void,
      style?: TextStyle
    ): Parser {
      nodes = reactStringReplace(
        nodes,
        /<a href=".*?" class="quotelink">>>(.*?)<\/a>/,
        (match, i) => {
          return (
            <Text
              key={match + i}
              style={[styles.quoteLink, style]}
              onPress={() => onPress && onPress(parseInt(match, 10), i)}
            >
              >>{match}
            </Text>
          );
        }
      );
      return parser;
    }
  };
  const entities = new AllHtmlEntities();
  nodes = [entities.decode(comment).replace(/<br>/g, '\n')];
  return parser;
}

const styles = StyleSheet.create({
  quote: {
    color: '#789922'
  },
  quoteLink: {
    color: '#d00'
  }
});
