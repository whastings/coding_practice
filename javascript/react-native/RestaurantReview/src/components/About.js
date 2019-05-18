import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        About Restaurant Review
      </Text>

      <Icon
        name='utensils'
        color='#0066cc'
        size={100}
        style={styles.icon}
      />

      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et ligula ullamcorper, pellentesque magna quis, lobortis quam.
      </Text>
      <Text style={styles.text}>
        Mauris efficitur elementum cursus. Cras ultrices urna in ex rutrum rutrum nec sit amet lacus. Suspendisse ullamcorper lectus eget ornare venenatis. Suspendisse potenti.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  header: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  icon: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  text: {
    color: '#444',
    fontSize: 14,
    marginTop: 20,
  },
});

export default About;
