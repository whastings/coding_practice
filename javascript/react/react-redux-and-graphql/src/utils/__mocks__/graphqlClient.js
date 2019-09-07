import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockLink } from '@apollo/react-testing/lib/mocks/mockLink'

const { GraphqlClient } = jest.requireActual('../graphqlClient')

const createApolloMocks = () => {
  const mockLink = new MockLink([], true)
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache({ addTypename: true }),
    link: mockLink,
  })

  return { mockLink, apolloClient }
}

const mockGraphqlClient = () => {
  let { mockLink, apolloClient } = createApolloMocks()

  const client = new GraphqlClient(apolloClient)

  client.mockRequests = (mocks) => {
    mocks.forEach((mock) => {
      mockLink.addMockedResponse(mock)
    })
  }

  client.resetMocks = () => {
    ({ mockLink, apolloClient } = createApolloMocks())
    client.apolloClient = apolloClient
  }

  return client
}

export default mockGraphqlClient()
