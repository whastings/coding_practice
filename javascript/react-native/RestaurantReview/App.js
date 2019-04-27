import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const restaurants = [
  { name: 'React Cafe', address: '123 Anywhere St' },
  { name: 'Fancy Restaurant', address: '799 Main St' },
  { name: 'Taco Place', address: '550 Maple Rd' },
];

export default class App extends Component {
  state = {
    search: '',
  };

  updateSearch = (text) => {
    this.setState({ search: text });
  };

  restaurantsToRender() {
    const { search } = this.state;

    if (!search) {
      return restaurants;
    }

    const lowerCaseSearch = search.toLowerCase();
    return restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(lowerCaseSearch));
  }

  render() {
    const { search } = this.state;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.header}>
          Restaurant Review!
        </Text>

        <TextInput
          style={styles.input}
          placeholder={'Live Search'}
          onChangeText={this.updateSearch}
          value={search}
        />

        {this.restaurantsToRender().map((place, index) => {
          return (
            <View
              key={place.name}
              style={[
                styles.row,
                { backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F7' },
              ]}
            >
              <View style={styles.edges}>
                <Text>{index + 1}</Text>
              </View>
              <View style={styles.nameAndAddress}>
                <Text>{place.name}</Text>
                <Text style={styles.addressText}>
                  {place.address}
                </Text>
              </View>
              <View style={styles.edges}>
                <Text>Info</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 40,
    fontSize: 30,
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '300',
  },
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
  input: {
    marginBottom: 30,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#F5F5F5',
  },
});
