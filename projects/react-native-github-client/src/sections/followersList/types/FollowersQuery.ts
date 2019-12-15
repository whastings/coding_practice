/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FollowersQuery
// ====================================================

export interface FollowersQuery_user_followers_nodes {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
}

export interface FollowersQuery_user_followers {
  __typename: "FollowerConnection";
  /**
   * A list of nodes.
   */
  nodes: (FollowersQuery_user_followers_nodes | null)[] | null;
}

export interface FollowersQuery_user {
  __typename: "User";
  /**
   * A list of users the given user is followed by.
   */
  followers: FollowersQuery_user_followers;
}

export interface FollowersQuery {
  /**
   * Lookup a user by login.
   */
  user: FollowersQuery_user | null;
}

export interface FollowersQueryVariables {
  login: string;
}
