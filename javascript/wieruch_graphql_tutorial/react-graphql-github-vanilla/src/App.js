import React, { Component } from 'react';
import axios from 'axios';

import Organization from './components/Organization';

const TITLE = 'React GraphQL GitHub Client';

const ORGANIZATION_REPO_QUERY = `
  query {
    organization(login: "facebook") {
      name
      url
      repository(name: "react") {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
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

class App extends Component {
  state = {
    errors: null,
    organization: null,
    repoPath: 'facebook/react',
  }

  componentDidMount() {
    this.fetchFromGitHub();
  }

  fetchFromGitHub() {
    api.post('', { query: ORGANIZATION_REPO_QUERY })
      .then((result) => {
        this.setState({
          organization: result.data.data && result.data.data.organization,
          errors: result.data.errors,
        });
      });
  }

  handleRepoPathChange = (event) => {
    this.setState({ repoPath: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
      return <Organization organization={organization} />
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
