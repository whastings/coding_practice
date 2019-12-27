import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { View, Text, Button } from 'react-native'

export interface UserScreenParams {
  userLogin: string,
}

const UserScreen: NavigationStackScreenComponent<UserScreenParams> = (props) => {
  const { params } = props.navigation.state

  const goToRepos = () => {
    props.navigation.navigate('ReposList')
  }

  return (
    <View>
      <Text>User: {params!.userLogin}</Text>
      <Button title='Repositories' onPress={goToRepos}>
        Repositories
      </Button>
    </View>
  )
}

export default UserScreen
