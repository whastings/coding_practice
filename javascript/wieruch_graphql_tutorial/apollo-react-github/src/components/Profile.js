import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from './Loading';
import RepoList from './RepoList';
import { REPOSITORY_FRAGMENT } from '../graphql';

const CURRENT_USER_QUERY = gql`
  {
    viewer {
      login
      name
      repositories(
        first: 5,
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }
  
  ${REPOSITORY_FRAGMENT}
`;

const Profile = () => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ loading, data, error }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <div>Error fetching profile</div>;
        }

        const { viewer } = data;
        const repos = viewer.repositories.edges.map(edge => edge.node);

        return (
          <div>
            <strong>User:</strong> {viewer.name} {viewer.login}
            <RepoList repos={repos} />
          </div>
        );
      }}
    </Query>
  );
};

export default Profile;
