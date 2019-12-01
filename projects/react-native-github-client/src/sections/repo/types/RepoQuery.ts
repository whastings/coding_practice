/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepoQuery
// ====================================================

export interface RepoQuery_repository_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface RepoQuery_repository {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: RepoQuery_repository_stargazers;
}

export interface RepoQuery {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: RepoQuery_repository | null;
}

export interface RepoQueryVariables {
  owner: string;
  name: string;
}
