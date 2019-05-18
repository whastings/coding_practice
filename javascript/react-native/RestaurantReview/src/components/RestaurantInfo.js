import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const RestaurantInfo = () => {
  return (
    <View style={styles.info}>
      <Text>Restaurant Info</Text>
      <Image
        source={{
          uri: `http://localhost:3000/images/circle.png`,
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    margin: 20,
  },
});

RestaurantInfo.navigationOptions = {
  title: 'Restaurant Info',
};

export default RestaurantInfo;
