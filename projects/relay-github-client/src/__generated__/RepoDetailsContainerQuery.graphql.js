/**
 * @flow
 * @relayHash e0a15a1cfb6b78e08f4d069f9faab42c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { RepoDetails_repo$ref } from "./RepoDetails_repo.graphql";
export type RepoDetailsContainerQueryVariables = {|
  name: string,
  owner: string,
|};
export type RepoDetailsContainerQueryResponse = {|
  +repository: ?{|
    +$fragmentRefs: RepoDetails_repo$ref
  |}
|};
export type RepoDetailsContainerQuery = {|
  variables: RepoDetailsContainerQueryVariables,
  response: RepoDetailsContainerQueryResponse,
|};
*/


/*
query RepoDetailsContainerQuery(
  $name: String!
  $owner: String!
) {
  repository(name: $name, owner: $owner) {
    ...RepoDetails_repo
    id
  }
}

fragment RepoDetails_repo on Repository {
  id
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "owner",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RepoDetailsContainerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "repository",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Repository",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RepoDetails_repo",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RepoDetailsContainerQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "repository",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Repository",
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
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RepoDetailsContainerQuery",
    "id": null,
    "text": "query RepoDetailsContainerQuery(\n  $name: String!\n  $owner: String!\n) {\n  repository(name: $name, owner: $owner) {\n    ...RepoDetails_repo\n    id\n  }\n}\n\nfragment RepoDetails_repo on Repository {\n  id\n  name\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ce23b50756b4d177fff23094f2c83ef9';

module.exports = node;
