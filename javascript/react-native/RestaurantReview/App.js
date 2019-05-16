import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import Header from './src/components/Header';

const restaurants = [
  { name: 'React Cafe', address: '123 Anywhere St' },
  { name: 'Fancy Restaurant', address: '799 Main St' },
  { name: 'Taco Place', address: '550 Maple Rd' },
  { name: "Tony's Diner", address: '4101 College St' },
  { name: 'Pasta Central', address: '706 Harper St' },
  { name: 'Burger Builder', address: '4869 Hamilton Dr' },
  { name: 'Pizza Express', address: '1049 Bird St' },
  { name: 'Teriyaki To Go', address: '1885 Tea Berry Lane' },
  { name: 'Maroon Deli', address: '1082 Stuart St' },
  { name: 'Prime Bar and Grill', address: '1848 Fairfax Dr' },
  { name: 'Dumpling House', address: '747 Kelly Dr' },
  { name: 'Hot Chicken', address: '1816 Olive St' },
  { name: "Luna's Tap Room", address: '3256 Spirit Dr' },
  { name: 'Quick Sandwich Shop', address: '2587 Cherry Ridge Dr' },
  { name: "Bobby's Burgers", address: '4152 Berkley St' },
  { name: 'Turnpike Diner', address: '4571 Central Ave' },
  { name: 'Bombay Express', address: '65 Queens Lane' },
  { name: 'Coffee Central', address: '3228 Oakwood Circle' },
  { name: "King's Garden", address: '2935 Victoria Ct' },
  { name: 'Salads and More', address: '2454 Preston St' },
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
        <Header />

        <TextInput
          style={styles.input}
          placeholder={'Live Search'}
          onChangeText={this.updateSearch}
          value={search}
        />

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
        </ScrollView>
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
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#F5F5F5',
  },
  scrollViewContainer: {
    paddingTop: 30,
  },
});
