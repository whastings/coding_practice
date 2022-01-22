import React from 'react';

import { StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

function CenterView({ children }: Props) {
  return <View style={styles.root}>{children}</View>;
}

export default CenterView;
