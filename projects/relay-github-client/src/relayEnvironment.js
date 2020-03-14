// @flow
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN || ''

function fetchQuery(
  operation,
  variables,
) {
  return fetch(GITHUB_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  })
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment
