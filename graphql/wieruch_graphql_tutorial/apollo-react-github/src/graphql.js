import gql from 'graphql-tag';

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    url
    descriptionHTML
    viewerHasStarred
    primaryLanguage {
      name
    }
    stargazers {
      totalCount
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query($cursor: String) {
    viewer {
      login
      name
      repositories(
        first: 5,
        orderBy: { field: STARGAZERS, direction: DESC },
        after: $cursor
      ) {
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
