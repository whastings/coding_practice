import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
// import { onError } from 'apollo-link-error';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const initApolloClient = (apiToken: string) => {
  const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
      authorization: `Bearer ${apiToken}`,
    },
  });

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors) {
  //     console.warn('GRAPHQL ERRORS:');
  //     console.warn(graphQLErrors);
  //   }

  //   if (networkError) {
  //     console.warn('NETWORK ERRORS:');
  //     console.warn(graphQLErrors);
  //   }
  // })

  const link = ApolloLink.from([/*errorLink, */httpLink])

  const cache = new InMemoryCache()

  return new ApolloClient({
    cache,
    link,
  })
}

export default initApolloClient
