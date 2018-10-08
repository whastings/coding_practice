import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import immutable from 'object-path-immutable';

import Loading from './Loading';
import RepoList from './RepoList';
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

const handleFetchMoreRepos = (fetchMore, lastEndCursor) => {
  fetchMore({
    variables: {
      cursor: lastEndCursor,
    },
    updateQuery(prevResult, { fetchMoreResult }) {
      if (!fetchMoreResult) {
        return prevResult;
      }
      return immutable.assign(prevResult, 'viewer.repositories', {
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...prevResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ],
      })
    },
  })
};

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
          return <div>Error fetching profile</div>;
        }

        const { viewer } = data;
        const { endCursor, hasNextPage } = viewer.repositories.pageInfo;
        const repos = viewer.repositories.edges.map(edge => edge.node);

        return (
          <div>
            <strong>User:</strong> {viewer.name} {viewer.login}
            <RepoList repos={repos} />
            {hasNextPage && (
              <button type="button" onClick={() => handleFetchMoreRepos(fetchMore, endCursor)}>
                Load More Repos
              </button>
            )}
            {loading && <Loading />}
          </div>
        );
      }}
    </Query>
  );
};

export default Profile;
