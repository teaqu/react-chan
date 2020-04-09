import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = { spoiler: string };
export const SpoilerComponent = (props: Props) => {
  const [showSpoiler, setSpoiler] = useState(false);
  return (
    <Text
      style={[styles.spoiler, showSpoiler && styles.showSpoiler]}
      onPress={() => {
        setSpoiler(!showSpoiler);
      }}
    >
      {props.spoiler}
    </Text>
  );
};

const styles = StyleSheet.create({
  spoiler: {
    backgroundColor: '#000'
  },
  showSpoiler: {
    color: '#FFF'
  }
});
