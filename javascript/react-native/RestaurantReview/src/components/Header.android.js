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
    padding: 40,
    fontSize: 30,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '300',
  },
});

export default Header;
