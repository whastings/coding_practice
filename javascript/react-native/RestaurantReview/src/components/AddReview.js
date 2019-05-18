import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddReview = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={handleClose}
        style={styles.closeButton}
      >
        <Icon name='close' size={30} color='#0066cc' />
      </TouchableOpacity>

      <Text style={styles.header}>Add Review</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30,
  },
  closeButton: {
    paddingHorizontal: 10,
  },
  header: {
    color: '#444',
    fontSize: 25,
    margin: 20,
    textAlign: 'center',
  },
});

export default AddReview;
