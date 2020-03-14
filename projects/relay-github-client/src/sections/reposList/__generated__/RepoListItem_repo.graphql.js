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
  +name: string,
  +owner: {|
    +login: string
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '14935a39d7c44bd4c91a8a8d6b31bc43';

module.exports = node;
