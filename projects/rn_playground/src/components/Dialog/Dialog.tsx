import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    padding: 20,
  },
});

function Dialog({ children }: Props) {
  return <View style={styles.root}>{children}</View>;
}

export default Dialog;
