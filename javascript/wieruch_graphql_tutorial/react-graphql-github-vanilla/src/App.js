import React, { Component } from 'react';
import axios from 'axios';

const TITLE = 'React GraphQL GitHub Client';

const ORGANIZATION_QUERY = `
  query {
    organization(login: "facebook") {
      name
      url
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
    repoPath: 'facebook/react',
  }

  componentDidMount() {
    this.fetchFromGitHub();
  }

  fetchFromGitHub() {
    api.post('', { query: ORGANIZATION_QUERY })
      .then(result => console.log(result));
  }

  handleRepoPathChange = (event) => {
    this.setState({ repoPath: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { repoPath } = this.state;

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
      </div>
    );
  }
}

export default App;
