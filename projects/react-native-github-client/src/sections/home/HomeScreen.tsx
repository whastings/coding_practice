import React from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { useCurrentUser } from '../../utils/CurrentUserProvider'

const HomeScreen: NavigationStackScreenComponent = (props) => {
  const currentUser = useCurrentUser()

  const goToOwnRepos = () => {
    props.navigation.navigate('ReposList')
  }

  return (
    <View>
      <Text>
        Hello, {currentUser!.login}
      </Text>
      <Button onPress={goToOwnRepos} title="Your Repositories">
        Your Repositories
      </Button>
    </View>
  )
}

HomeScreen.navigationOptions = {
  title: 'Home',
}

export default HomeScreen
