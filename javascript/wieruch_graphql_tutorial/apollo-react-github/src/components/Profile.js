import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from './Loading';
import ReposLoader from './ReposLoader';
import { REPOSITORY_FRAGMENT } from '../graphql';

const CURRENT_USER_QUERY = gql`
  query($cursor: String) {
    viewer {
      login
      name
      repositories(
        first: 5,
        orderBy: { field: STARGAZERS, direction: DESC },
        after: $cursor
      ) {
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

const Profile = () => {
  return (
    <Query
      query={CURRENT_USER_QUERY}
      notifyOnNetworkStatusChange={true} // So loading will be updated for subsequent pages
    >
      {({ loading, data, error, fetchMore }) => {
        if (loading && (!data ||!data.viewer)) {
          return <Loading />;
        }
        if (error) {
          return <div>Error fetching viewer</div>;
        }

        const { viewer } = data;

        return (
          <div>
            <strong>User:</strong> {viewer.name} {viewer.login}
            <ReposLoader
              data={data}
              queryRoot="viewer"
              fetchMore={fetchMore}
              loading={loading}
            />
          </div>
        );
      }}
    </Query>
  );
};

export default Profile;
