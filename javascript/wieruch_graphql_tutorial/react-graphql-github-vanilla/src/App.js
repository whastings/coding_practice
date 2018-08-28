import React, { Component } from 'react';
import axios from 'axios';
import mergeWith from 'lodash.mergewith';

import Errors from './components/Errors';
import Organization from './components/Organization';
import RepoPathForm from './components/RepoPathForm';
import { ADD_STAR_MUTATION, ORGANIZATION_REPO_QUERY, REMOVE_STAR_MUTATION } from './graphql';

const TITLE = 'React GraphQL GitHub Client';

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

  handleRepoPathChange = (newValue) => {
    this.setState({ repoPath: newValue });
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

        <RepoPathForm
          onChange={this.handleRepoPathChange}
          onSubmit={this.fetchFromGitHub}
          repoPath={repoPath}
        />

        <hr />

        {errors ? <Errors errors={errors} /> : this.renderOrganization()}
      </div>
    );
  }
}

export default App;
