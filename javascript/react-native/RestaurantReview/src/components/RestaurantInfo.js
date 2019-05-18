import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { API_ROOT } from '../constants';
import Stars from './Stars';

const RestaurantInfo = ({ navigation }) => {
  const restaurant = navigation.getParam('restaurant');

  const handleAddReviewClick = () => {
    navigation.navigate('AddReview');
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: `${API_ROOT}/images/${restaurant.image}` }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.address}>{restaurant.address}</Text>
          <Stars rating={restaurant.rating} />
          <TouchableOpacity style={styles.button} onPress={handleAddReviewClick}>
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
  },
  address: {
    color: 'grey',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 14,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  buttonText: {
    color: '#0066cc',
    fontSize: 12,
    textAlign: 'center',
  },
});

RestaurantInfo.navigationOptions = {
  title: 'Restaurant Info',
};

export default RestaurantInfo;
