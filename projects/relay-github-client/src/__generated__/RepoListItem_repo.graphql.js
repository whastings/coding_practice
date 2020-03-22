/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RepoListItem_repo$ref: FragmentReference;
declare export opaque type RepoListItem_repo$fragmentType: RepoListItem_repo$ref;
export type RepoListItem_repo = {|
  +id: string,
  +name: string,
  +owner: {|
    +login: string
  |},
  +viewerHasStarred: boolean,
  +stargazers: {|
    +totalCount: number
  |},
  +$refType: RepoListItem_repo$ref,
|};
export type RepoListItem_repo$data = RepoListItem_repo;
export type RepoListItem_repo$key = {
  +$data?: RepoListItem_repo$data,
  +$fragmentRefs: RepoListItem_repo$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "RepoListItem_repo",
  "type": "Repository",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "owner",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "login",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "viewerHasStarred",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "stargazers",
      "storageKey": null,
      "args": null,
      "concreteType": "StargazerConnection",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "totalCount",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'fbf80d269d9356a01610529dcc47a43b';

module.exports = node;
