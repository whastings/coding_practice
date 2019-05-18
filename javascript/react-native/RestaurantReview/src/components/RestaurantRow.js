import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Stars from './Stars';

const RestaurantRow = ({ restaurant, index, onInfoClick }) => {
  return (
    <View
      key={restaurant.name}
      style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}
    >
      <View style={styles.row}>
        <View style={[styles.edges, styles.starsContainer]}>
          <Stars rating={restaurant.rating} />
        </View>
        <View style={styles.nameAndAddress}>
          <Text>{restaurant.name}</Text>
          <Text style={styles.addressText}>
            {restaurant.address}
          </Text>
        </View>
        <View style={[styles.edges, styles.infoButtonContainer]}>
          <TouchableHighlight
            onPress={() => onInfoClick(restaurant)}
            style={styles.infoButton}
            underlayColor='#5398DC'
          >
            <Text style={styles.infoButtonText}>Info</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  starsContainer: {
    alignItems: 'flex-start',
    minWidth: 85,
    paddingLeft: 15,
  },
  edges: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameAndAddress: {
    flexDirection: 'column',
    flex: 1,
  },
  addressText: {
    color: 'grey'
  },
  infoButtonContainer: {
    minWidth: 70,
  },
  infoButton: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
  infoButtonText: {
    color: '#0066CC',
    fontSize: 12,
  },
});

export default RestaurantRow;
