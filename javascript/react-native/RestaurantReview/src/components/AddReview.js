import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { API_ROOT } from '../constants';

const AddReview = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const [commentValue, setCommentValue] = useState('');

  const handleClose = () => {
    navigation.goBack();
  };

  const submitReview = () => {
    setIsSubmitting(true);
    fetch(`${API_ROOT}/reviews`, {
      method: 'POST',
      body: JSON.stringify({
        name: nameValue,
        rating: ratingValue,
        comment: commentValue,
      }),
    })
      .then(handleClose, () => setIsSubmitting(false));
  };

  return (
    <KeyboardAwareScrollView style={styles.scrollView}>
      <View style={styles.root}>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
        >
          <Icon name='close' size={30} color='#0066cc' />
        </TouchableOpacity>

        <Text style={styles.header}>Add Review</Text>

        <TextInput
          style={styles.input}
          placeholder='Name (optional)'
          value={nameValue}
          onChangeText={setNameValue}
        />

        <Text style={styles.ratingLabel}>Your Rating:</Text>
        <View style={styles.stars}>
          {[...(new Array(5))].map((_, i) => {
            return (
              <TouchableOpacity
                onPress={() => setRatingValue(i)}
                style={styles.starButton}
                key={i}
              >
                <Icon
                  name='star'
                  color={(ratingValue >= i) ? '#ffd64c' : '#ccc'}
                  size={40}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder='Review'
          value={commentValue}
          onChangeText={setCommentValue}
          numberOfLines={5}
          multiline
        />

        {isSubmitting && (
          <ActivityIndicator size='large' color='#0066cc' style={styles.loadingIndicator} />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={submitReview} disabled={isSubmitting}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3
  },
  ratingLabel: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
    marginVertical: 40
  },
  stars: {
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  starButton: {
    padding: 5
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0066cc',
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20
  },
  submitButtonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center'
  },
  scrollView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loadingIndicator: {
    padding: 10,
  },
});

export default AddReview;
