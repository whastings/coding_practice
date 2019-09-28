/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OwnReposQuery
// ====================================================

export interface OwnReposQuery_viewer_repositories_nodes_owner {
  __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  login: string;
}

export interface OwnReposQuery_viewer_repositories_nodes {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The User owner of the repository.
   */
  owner: OwnReposQuery_viewer_repositories_nodes_owner;
}

export interface OwnReposQuery_viewer_repositories_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface OwnReposQuery_viewer_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (OwnReposQuery_viewer_repositories_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: OwnReposQuery_viewer_repositories_pageInfo;
}

export interface OwnReposQuery_viewer {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: OwnReposQuery_viewer_repositories;
}

export interface OwnReposQuery {
  /**
   * The currently authenticated user.
   */
  viewer: OwnReposQuery_viewer;
}

export interface OwnReposQueryVariables {
  first: number;
  after?: string | null;
}
