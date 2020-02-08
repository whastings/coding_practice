import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link'
import { MockLink } from '@apollo/react-testing/lib/mocks/mockLink'
import { schema as githubSchema } from '@octokit/graphql-schema'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import SchemaLink from 'apollo-link-schema';

const { GraphqlClient } = jest.requireActual('../graphqlClient')

const createApolloMocks = () => {
  const mockLink = new MockLink([], true)
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache({ addTypename: true }),
    link: mockLink,
  })

  return { mockLink, apolloClient }
}

const createDummyApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: true }),
    link: new ApolloLink(() => {
      return new Observable(() => {});
    })
  })
}

const createMockedSchemaApolloClient = (resolvers) => {
  const schema = makeExecutableSchema({
    typeDefs: githubSchema.idl,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })
  addMockFunctionsToSchema({ schema, mocks: resolvers })
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  })
}

const mockGraphqlClient = () => {
  const client = new GraphqlClient(createDummyApolloClient())

  client.mockRequests = (mocks) => {
    const { mockLink, apolloClient } = createApolloMocks()
    client.apolloClient = apolloClient
    mocks.forEach((mock) => {
      mockLink.addMockedResponse(mock)
    })
  }

  client.mockSchema = (resolvers = {}) => {
    client.apolloClient = createMockedSchemaApolloClient(resolvers)
  }

  client.reset = () => {
    client.apolloClient = createDummyApolloClient()
  }

  return client
}

export default mockGraphqlClient()
