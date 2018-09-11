import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from './Loading';

const CURRENT_USER_QUERY = gql`
  {
    viewer {
      login
      name
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

        return (
          <div>
            {viewer.name} {viewer.login}
          </div>
        );
      }}
    </Query>
  );
};

export default Profile;
