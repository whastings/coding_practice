import React from 'react';
import { Query } from 'react-apollo';

import Loading from './Loading';
import ReposLoader from './ReposLoader';
import { CURRENT_USER_QUERY } from '../graphql';


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
