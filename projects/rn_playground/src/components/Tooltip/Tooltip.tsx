import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  left: number;
  onLayout: (event: LayoutChangeEvent) => void;
  top: number;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 5,
    padding: 8,
    position: 'absolute',
  },
});

function Tooltip({ children, left, onLayout, top }: Props) {
  return (
    <View onLayout={onLayout} style={[styles.root, { left, top }]}>
      {children}
    </View>
  );
}

export default Tooltip;
