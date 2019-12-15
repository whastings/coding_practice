import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { Button, Text, View } from 'react-native'

import { useRepoQuery, useToggleStarMutation } from './repoHooks'

export interface RepoScreenParams {
  repoName: string,
  ownerName: string,
}

const RepoScreen: NavigationStackScreenComponent<RepoScreenParams> = (props) => {
  const { params } = props.navigation.state
  const { repoName, ownerName } = params!
  const { data, loading } = useRepoQuery(ownerName, repoName)
  const [toggleStar, { loading: toggleStarLoading }] = useToggleStarMutation(ownerName, repoName)

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  if (!data || !data.repository) {
    return (
      <Text>Not Found</Text>
    )
  }

  const { repository } = data
  const toggleStarButtonText = repository.viewerHasStarred ? 'Remove Star' : 'Add Star'
  const handleToggleStarClick = () => {
    toggleStar()
  }

  return (
    <View>
      <Text>{repository.name}</Text>
      <Text>Stars: {repository.stargazers.totalCount}</Text>
      <Button onPress={handleToggleStarClick} title={toggleStarButtonText} disabled={toggleStarLoading}>
        {toggleStarButtonText}
      </Button>
    </View>
  )
}

export default RepoScreen
