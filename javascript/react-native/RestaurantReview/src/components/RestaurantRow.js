import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RestaurantRow = ({ restaurant, index }) => {
  return (
    <View
      key={restaurant.name}
      style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' },
      ]}
    >
      <View style={styles.edges}>
        <Text>{index + 1}</Text>
      </View>
      <View style={styles.nameAndAddress}>
        <Text>{restaurant.name}</Text>
        <Text style={styles.addressText}>
          {restaurant.address}
        </Text>
      </View>
      <View style={styles.edges}>
        <Text>Info</Text>
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
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameAndAddress: {
    flexDirection: 'column',
    flex: 8,
  },
  addressText: {
    color: 'grey'
  },
});

export default RestaurantRow;
