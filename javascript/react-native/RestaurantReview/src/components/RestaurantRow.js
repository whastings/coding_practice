import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const RestaurantRow = ({ restaurant, index }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoButtonPress = () => {
    setShowInfo(!showInfo);
  };

  return (
    <View
      key={restaurant.name}
      style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' }}
    >
      <View style={styles.row}>
        <View style={[styles.edges, styles.numberContainer]}>
          <Text>{index + 1}</Text>
        </View>
        <View style={styles.nameAndAddress}>
          <Text>{restaurant.name}</Text>
          <Text style={styles.addressText}>
            {restaurant.address}
          </Text>
        </View>
        <View style={[styles.edges, styles.infoButtonContainer]}>
          <TouchableHighlight
            onPress={handleInfoButtonPress}
            style={styles.infoButton}
            underlayColor='#5398DC'
          >
            <Text style={styles.infoButtonText}>Info</Text>
          </TouchableHighlight>
        </View>
      </View>
      {showInfo && (
        <View style={styles.info}>
          <Text>Restaurant Info</Text>
          <Image
            source={{
              uri: `http://localhost:3000/images/${restaurant.image}`,
              width: 100,
              height: 100,
            }}
          />
        </View>
      )}
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
  numberContainer: {
    minWidth: 40,
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
  info: {
    marginHorizontal: 40,
    marginVertical: 5,
    marginBottom: 20,
  },
});

export default RestaurantRow;
