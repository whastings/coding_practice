/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RepoDetails_repo$ref: FragmentReference;
declare export opaque type RepoDetails_repo$fragmentType: RepoDetails_repo$ref;
export type RepoDetails_repo = {|
  +id: string,
  +name: string,
  +$refType: RepoDetails_repo$ref,
|};
export type RepoDetails_repo$data = RepoDetails_repo;
export type RepoDetails_repo$key = {
  +$data?: RepoDetails_repo$data,
  +$fragmentRefs: RepoDetails_repo$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "RepoDetails_repo",
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '1bc076b859e3561997a5110b3cc32351';

module.exports = node;
