import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { FlatList, View, Text } from 'react-native'

import { useFollowersQuery } from './followersListHooks'
import { useCurrentUser } from '../../utils/CurrentUserProvider'
import ClickableListItem from '../../components/ClickableListItem'
import { UserScreenParams } from '../users/UserScreen'

const FollowersListScreen: NavigationStackScreenComponent = (props) => {
  const { login } = useCurrentUser()
  const { followers, loading } = useFollowersQuery(login)

  const goToFollower = (userLogin: string) => {
    const params: UserScreenParams = { userLogin }
    props.navigation.navigate('User', params)
  }

  if (loading || !followers) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <View>
      <Text>Your Followers</Text>
      <FlatList
        data={followers.filter(Boolean)}
        renderItem={({ item }) => (
          <ClickableListItem name={item!.login} onPress={() => goToFollower(item!.login)} />
        )}
        keyExtractor={(item) => item!.login}
      />
    </View>
  )
}

export default FollowersListScreen
