/**
 * @flow
 * @relayHash 72dc345c7dbe8c938cc11244b961d4b1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { IssueListItem_issue$ref } from "./IssueListItem_issue.graphql";
export type RepoIssueFormCreateMutationVariables = {|
  repoId: string,
  title: string,
  body?: ?string,
|};
export type RepoIssueFormCreateMutationResponse = {|
  +createIssue: ?{|
    +issue: ?{|
      +id: string,
      +$fragmentRefs: IssueListItem_issue$ref,
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
      ...IssueListItem_issue
    }
  }
}

fragment IssueListItem_issue on Issue {
  title
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RepoIssueFormCreateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createIssue",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "kind": "FragmentSpread",
                "name": "IssueListItem_issue",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RepoIssueFormCreateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createIssue",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "RepoIssueFormCreateMutation",
    "id": null,
    "text": "mutation RepoIssueFormCreateMutation(\n  $repoId: ID!\n  $title: String!\n  $body: String\n) {\n  createIssue(input: {repositoryId: $repoId, title: $title, body: $body}) {\n    issue {\n      id\n      ...IssueListItem_issue\n    }\n  }\n}\n\nfragment IssueListItem_issue on Issue {\n  title\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bb845c96cab320e11826eb6ee32e661b';

module.exports = node;
