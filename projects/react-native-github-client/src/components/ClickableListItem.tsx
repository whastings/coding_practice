import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

interface Props {
  name: string,
  onPress: () => void,
}

const ClickableListItem: React.FC<Props> = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 22,
  },
});

export default ClickableListItem
