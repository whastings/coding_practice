/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveStarMutation
// ====================================================

export interface RemoveStarMutation_removeStar_starrable_Topic {
  __typename: "Topic" | "Gist";
  id: string;
}

export interface RemoveStarMutation_removeStar_starrable_Repository_stargazers {
  __typename: "StargazerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface RemoveStarMutation_removeStar_starrable_Repository {
  __typename: "Repository";
  id: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: RemoveStarMutation_removeStar_starrable_Repository_stargazers;
}

export type RemoveStarMutation_removeStar_starrable = RemoveStarMutation_removeStar_starrable_Topic | RemoveStarMutation_removeStar_starrable_Repository;

export interface RemoveStarMutation_removeStar {
  __typename: "RemoveStarPayload";
  /**
   * The starrable.
   */
  starrable: RemoveStarMutation_removeStar_starrable | null;
}

export interface RemoveStarMutation {
  /**
   * Removes a star from a Starrable.
   */
  removeStar: RemoveStarMutation_removeStar | null;
}

export interface RemoveStarMutationVariables {
  id: string;
}
