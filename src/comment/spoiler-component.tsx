import React, { ReactNode, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = { children: ReactNode };
export const SpoilerComponent = (props: Props) => {
  const [showSpoiler, setSpoiler] = useState(false);
  return (
    <Text
      style={showSpoiler && styles.showSpoiler}
      onPress={() => {
        setSpoiler(!showSpoiler);
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  showSpoiler: {
    color: '#FFF'
  }
});
