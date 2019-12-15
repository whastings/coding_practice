import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { View, Text, Button } from 'react-native'

export interface UserScreenParams {
  userLogin: string,
}

const UserScreen: NavigationStackScreenComponent<UserScreenParams> = (props) => {
  const { params } = props.navigation.state

  return (
    <View>
      <Text>User: {params!.userLogin}</Text>
    </View>
  )
}

export default UserScreen
