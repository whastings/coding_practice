import apolloClient from './apolloClient'

class GraphqlClient {
  constructor(apolloClient) {
    this.apolloClient = apolloClient
    this.queries = new Map()
  }

  query = ({ queryName, query, variables, ...otherOptions }) => {
    this.queries.set(queryName, { query, variables })
    return this.apolloClient.query({ query, variables, ...otherOptions })
  }

  readQuery(queryName) {
    const { query, variables } = this.queries.get(queryName)
    return this.apolloClient.readQuery({ query, variables })
  }
}

const client = new GraphqlClient(apolloClient)

export default client
