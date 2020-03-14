/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type RepoListItem_repo$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ReposList_viewerReposData$ref: FragmentReference;
declare export opaque type ReposList_viewerReposData$fragmentType: ReposList_viewerReposData$ref;
export type ReposList_viewerReposData = {|
  +repositories: {|
    +nodes: ?$ReadOnlyArray<?{|
      +id: string,
      +$fragmentRefs: RepoListItem_repo$ref,
    |}>,
    +pageInfo: {|
      +endCursor: ?string,
      +hasNextPage: boolean,
    |},
  |},
  +$refType: ReposList_viewerReposData$ref,
|};
export type ReposList_viewerReposData$data = ReposList_viewerReposData;
export type ReposList_viewerReposData$key = {
  +$data?: ReposList_viewerReposData$data,
  +$fragmentRefs: ReposList_viewerReposData$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ReposList_viewerReposData",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "repositories",
      "storageKey": "repositories(first:10)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "RepositoryConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "nodes",
          "storageKey": null,
          "args": null,
          "concreteType": "Repository",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "FragmentSpread",
              "name": "RepoListItem_repo",
              "args": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '5c2dd833c0c9b6575db01e182d73f180';

module.exports = node;
