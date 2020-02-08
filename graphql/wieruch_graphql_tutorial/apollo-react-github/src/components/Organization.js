import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from './Loading';
import OrgNameForm from './OrgNameForm';
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

class Organization extends React.Component {
  state = {
    orgName: 'facebook',
  }

  updateOrgName = (orgName) => {
    this.setState({ orgName });
  }

  render() {
    const { orgName } = this.state;
    return (
      <React.Fragment>
        <OrgNameForm defaultValue={orgName} onSubmit={this.updateOrgName} />
        <Query
          query={ORG_REPOS_QUERY}
          variables={{ orgName }}
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
      </React.Fragment>
    );
  }
}

export default Organization;
