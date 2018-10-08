import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from './Loading';
import ReposLoader from './ReposLoader';
import { REPOSITORY_FRAGMENT } from '../graphql';

const ORG_REPOS_QUERY = gql`
  query($orgName: String!, $cursor: String) {
    organization(login: $orgName) {
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Organization = () => {
  return (
    <Query
      query={ORG_REPOS_QUERY}
      variables={{ orgName: 'facebook' }}
      notifyOnNetworkStatusChange={true}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading && (!data ||!data.organization)) {
          return <Loading />;
        }
        if (error) {
          return <div>Error fetching organization</div>;
        }

        return (
          <ReposLoader
            data={data}
            queryRoot="organization"
            fetchMore={fetchMore}
            loading={loading}
          />
        );
      }}
    </Query>
  );
};

export default Organization;
