/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReposQuery
// ====================================================

export interface ReposQuery_user_repositories_nodes_owner {
  __typename: "User" | "Organization";
  /**
   * The username used to login.
   */
  login: string;
}

export interface ReposQuery_user_repositories_nodes {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The User owner of the repository.
   */
  owner: ReposQuery_user_repositories_nodes_owner;
}

export interface ReposQuery_user_repositories_pageInfo {
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

export interface ReposQuery_user_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (ReposQuery_user_repositories_nodes | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: ReposQuery_user_repositories_pageInfo;
}

export interface ReposQuery_user {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: ReposQuery_user_repositories;
}

export interface ReposQuery {
  /**
   * Lookup a user by login.
   */
  user: ReposQuery_user | null;
}

export interface ReposQueryVariables {
  login: string;
  first: number;
  after?: string | null;
}
