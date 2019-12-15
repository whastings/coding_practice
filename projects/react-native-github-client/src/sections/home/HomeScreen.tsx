import React from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { useCurrentUser } from '../../utils/CurrentUserProvider'

const HomeScreen: NavigationStackScreenComponent = (props) => {
  const currentUser = useCurrentUser()

  const navigate = (screen: string) => {
    props.navigation.navigate(screen)
  }

  return (
    <View>
      <Text>
        Hello, {currentUser!.login}
      </Text>
      <Button onPress={() => navigate('ReposList')} title="Your Repositories">
        Your Repositories
      </Button>
      <Button onPress={() => navigate('FollowersList')} title="Your Followers">
        Your Followers
      </Button>
    </View>
  )
}

HomeScreen.navigationOptions = {
  title: 'Home',
}

export default HomeScreen
