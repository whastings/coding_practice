import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { useOwnReposQuery } from './reposListHooks'
import { Repository } from './types/reposListTypes'
import ClickableListItem from '../../components/ClickableListItem'
import { RepoScreenParams } from '../repo/RepoScreen'

const ReposListScreen: NavigationStackScreenComponent = (props) => {
  const { fetchMore, hasNextPage, loading, loadingMore, repos } = useOwnReposQuery()

  if (loading || !repos) {
    return (
      <Text>Loading...</Text>
    )
  }

  const getLoadMoreButton = () => (
    <Button onPress={fetchMore} title='Load More' disabled={loadingMore}>
      Load More
    </Button>
  )

  const navigateToRepo = (repo: Repository) => {
    const params: RepoScreenParams = {
      repoName: repo.name,
      ownerName: repo.owner.login
    }
    props.navigation.navigate({
      routeName: 'Repo',
      params,
    })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={repos}
        renderItem={({ item }) => (
          <ClickableListItem
            name={item!.name}
            onPress={() => navigateToRepo(item!)}
          />
        )}
        keyExtractor={(item) => item!.id}
        ListFooterComponent={hasNextPage ? getLoadMoreButton : null}
      />
    </View>
  )
}

ReposListScreen.navigationOptions = {
  title: 'Repositories',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ReposListScreen
