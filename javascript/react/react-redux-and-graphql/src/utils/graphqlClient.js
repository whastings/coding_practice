import apolloClient from './apolloClient'

class GraphqlClient {
  constructor(apolloClient) {
    this.apolloClient = apolloClient
    this.queries = new Map()
  }

  fetchMore = ({ queryName, variables, updateQuery }) => {
    const { observable } = this.queries.get(queryName)
    return observable.fetchMore({ variables, updateQuery })
  }

  query = ({ queryName, query, variables, ...otherOptions }) => {
    const observable = this.apolloClient.watchQuery({ query, variables, ...otherOptions })
    this.queries.set(queryName, { query, variables, observable })
    return observable.result()
  }

  readQuery = (queryName)  => {
    const { observable } = this.queries.get(queryName)
    return observable.getCurrentResult().data
  }

  subscribeToQuery = (queryName, callback) => {
    const { observable } = this.queries.get(queryName)
    const subscription = observable.subscribe({
      next: callback,
      error(error) {
        callback({ error })
      }
    })
    return () => subscription.unsubscribe()
  }
}

const client = new GraphqlClient(apolloClient)

export default client
