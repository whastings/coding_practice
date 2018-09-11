import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from './Loading';
import RepoList from './RepoList';

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
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const Profile = () => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ loading, data, error }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          console.log(error);
          return null;
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
