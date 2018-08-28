import React, { Component } from 'react';
import axios from 'axios';
import mergeWith from 'lodash.mergewith';

import Organization from './components/Organization';

const TITLE = 'React GraphQL GitHub Client';

const ORGANIZATION_REPO_QUERY = `
  query ($orgName: String!, $repoName: String!, $cursor: String) {
    organization(login: $orgName) {
      name
      url
      repository(name: $repoName) {
        id
        name
        url
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

const ADD_STAR_MUTATION = `
  mutation ($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR_MUTATION = `
  mutation ($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const api = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  }
});

const mergeArrays = (value1, value2) => {
  return Array.isArray(value1) ? value1.concat(value2) : undefined;
};

class App extends Component {
  state = {
    errors: null,
    organization: null,
    repoPath: 'facebook/react',
  }

  componentDidMount() {
    this.fetchFromGitHub();
  }

  fetchFromGitHub = (cursor = null) => {
    const { repoPath } = this.state;
    const [orgName, repoName] = repoPath.split('/');

    api.post('', {
      query: ORGANIZATION_REPO_QUERY,
      variables: { orgName, repoName, cursor },
    })
      .then((result) => {
        if (result.data.errors) {
          this.setState({
            organization: null,
            errors: result.data.errors,
          });
          return;
        }

        const currentOrg = this.state.organization;
        const newData = result.data.data.organization;

        if (!newData.repository) {
          this.setState({
            organization: null,
            errors: [{ message: 'Repo not found' }],
          });
          return;
        }

        const organization = (currentOrg && currentOrg.repository.url === newData.repository.url) ?
          mergeWith({}, this.state.organization, newData, mergeArrays) : newData;
        this.setState({
          organization,
          errors: null,
        });
      });
  }

  handleRepoPathChange = (event) => {
    this.setState({ repoPath: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchFromGitHub();
  }

  processMutationResult(mutationName, result) {
    const currentOrg = this.state.organization;
    const updatedRepo = result.data.data[mutationName].starrable;
    if (updatedRepo) {
      currentOrg.repository.viewerHasStarred = updatedRepo.viewerHasStarred;
      this.setState({ organization: currentOrg });
    }
  }

  starRepo = () => {
    const repositoryId = this.state.organization.repository.id;

    api.post('', {
      query: ADD_STAR_MUTATION,
      variables: { repositoryId },
    })
      .then((result) => this.processMutationResult('addStar', result));
  }

  unstarRepo = () => {
    const repositoryId = this.state.organization.repository.id;

    api.post('', {
      query: REMOVE_STAR_MUTATION,
      variables: { repositoryId },
    })
      .then((result) => this.processMutationResult('removeStar', result));
  }

  renderErrors() {
    const { errors } = this.state;

    return (
      <div>
        <h2>Something Went Wrong:</h2>
        <ul>
          {errors.map(error => <li key={error.message}>{error.message}</li>)}
        </ul>
      </div>
    );
  }

  renderOrganization() {
    const { organization } = this.state;

    if (organization) {
      return (
        <Organization
          organization={organization}
          onFetchMoreIssues={this.fetchFromGitHub}
          onStarRepo={this.starRepo}
          onUnstarRepo={this.unstarRepo}
        />
      );
    }

    return (
      <div>No information yet...</div>
    );
  }

  render() {
    const { errors, repoPath } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="repo-path">
            Show open issues for repo:
          </label>
          <input
            id="repo-path"
            onChange={this.handleRepoPathChange}
            value={repoPath}
          />
          <button>Submit</button>
        </form>

        <hr />

        {errors ? this.renderErrors() : this.renderOrganization()}
      </div>
    );
  }
}

export default App;
