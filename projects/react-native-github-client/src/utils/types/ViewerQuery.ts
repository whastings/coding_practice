/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerQuery
// ====================================================

export interface ViewerQuery_viewer {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
}

export interface ViewerQuery {
  /**
   * The currently authenticated user.
   */
  viewer: ViewerQuery_viewer;
}
