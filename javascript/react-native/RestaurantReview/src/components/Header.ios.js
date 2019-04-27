import React from 'react';

import { StyleSheet, Text } from 'react-native';

const Header = () => {
  return (
    <Text style={styles.header}>
      Restaurant Review
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 50,
    fontSize: 26,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '200',
  },
});

export default Header;
