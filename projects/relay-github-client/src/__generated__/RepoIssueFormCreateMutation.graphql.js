/**
 * @flow
 * @relayHash cb47ecf5e040fce055277d4cd5981240
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RepoIssueFormCreateMutationVariables = {|
  repoId: string,
  title: string,
  body?: ?string,
|};
export type RepoIssueFormCreateMutationResponse = {|
  +createIssue: ?{|
    +issue: ?{|
      +id: string,
      +title: string,
    |}
  |}
|};
export type RepoIssueFormCreateMutation = {|
  variables: RepoIssueFormCreateMutationVariables,
  response: RepoIssueFormCreateMutationResponse,
|};
*/


/*
mutation RepoIssueFormCreateMutation(
  $repoId: ID!
  $title: String!
  $body: String
) {
  createIssue(input: {repositoryId: $repoId, title: $title, body: $body}) {
    issue {
      id
      title
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "repoId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "title",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "body",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createIssue",
    "storageKey": null,
    "args": [
      {
        "kind": "ObjectValue",
        "name": "input",
        "fields": [
          {
            "kind": "Variable",
            "name": "body",
            "variableName": "body"
          },
          {
            "kind": "Variable",
            "name": "repositoryId",
            "variableName": "repoId"
          },
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "title"
          }
        ]
      }
    ],
    "concreteType": "CreateIssuePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "issue",
        "storageKey": null,
        "args": null,
        "concreteType": "Issue",
        "plural": false,
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
            "name": "title",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RepoIssueFormCreateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "RepoIssueFormCreateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "RepoIssueFormCreateMutation",
    "id": null,
    "text": "mutation RepoIssueFormCreateMutation(\n  $repoId: ID!\n  $title: String!\n  $body: String\n) {\n  createIssue(input: {repositoryId: $repoId, title: $title, body: $body}) {\n    issue {\n      id\n      title\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '09eb35f0e3a405d58b4b0e8b305bcbb6';

module.exports = node;
