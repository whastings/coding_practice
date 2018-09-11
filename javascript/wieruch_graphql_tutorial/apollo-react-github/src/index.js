import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.warn('GRAPHQL ERRORS:');
    console.warn(graphQLErrors);
  }

  if (networkError) {
    console.warn('NETWORK ERRORS:');
    console.warn(graphQLErrors);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
