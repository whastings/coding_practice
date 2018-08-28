export const ORGANIZATION_REPO_QUERY = `
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

export const ADD_STAR_MUTATION = `
  mutation ($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR_MUTATION = `
  mutation ($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
