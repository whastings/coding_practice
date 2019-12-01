/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddStarMutation
// ====================================================

export interface AddStarMutation_addStar_starrable_Gist {
  __typename: "Gist" | "Topic";
  id: string;
}

export interface AddStarMutation_addStar_starrable_Repository_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface AddStarMutation_addStar_starrable_Repository {
  __typename: "Repository";
  id: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: AddStarMutation_addStar_starrable_Repository_stargazers;
}

export type AddStarMutation_addStar_starrable = AddStarMutation_addStar_starrable_Gist | AddStarMutation_addStar_starrable_Repository;

export interface AddStarMutation_addStar {
  __typename: "AddStarPayload";
  /**
   * The starrable.
   */
  starrable: AddStarMutation_addStar_starrable | null;
}

export interface AddStarMutation {
  /**
   * Adds a star to a Starrable.
   */
  addStar: AddStarMutation_addStar | null;
}

export interface AddStarMutationVariables {
  id: string;
}
