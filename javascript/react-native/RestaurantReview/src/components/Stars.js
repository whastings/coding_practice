import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stars = ({ rating }) => {
  const stars = [...Array(Math.ceil(rating))];

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map((_, i) => {
        const name = (Math.floor(rating) > i) ? 'star' : 'star-half';
        return <Icon key={i} name={name} color='#ffd64c' />;
      })}
    </View>
  );
};

export default Stars;
