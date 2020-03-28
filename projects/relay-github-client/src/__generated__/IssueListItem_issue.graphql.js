/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type IssueListItem_issue$ref: FragmentReference;
declare export opaque type IssueListItem_issue$fragmentType: IssueListItem_issue$ref;
export type IssueListItem_issue = {|
  +title: string,
  +$refType: IssueListItem_issue$ref,
|};
export type IssueListItem_issue$data = IssueListItem_issue;
export type IssueListItem_issue$key = {
  +$data?: IssueListItem_issue$data,
  +$fragmentRefs: IssueListItem_issue$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "IssueListItem_issue",
  "type": "Issue",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'fbe8b13ff0aed32832d6b8a44c501d60';

module.exports = node;
