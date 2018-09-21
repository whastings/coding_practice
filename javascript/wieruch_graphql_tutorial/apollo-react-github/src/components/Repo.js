import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import immutable from 'object-path-immutable';

import Loading from './Loading';
import { REPOSITORY_FRAGMENT } from '../graphql';

const ADD_STAR_MUTATION = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR_MUTATION = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const updateRepoStarCount = (id, viewerHadStarred, client, mutationResult) => {
  const cacheId = `Repository:${id}`;
  const repo = client.readFragment({
    id: cacheId,
    fragment: REPOSITORY_FRAGMENT,
  });
  const newStarCount = repo.stargazers.totalCount + (viewerHadStarred ? -1 : 1);
  const data = immutable.set(repo, 'stargazers.totalCount', newStarCount);

  client.writeFragment({
    id: cacheId,
    fragment: REPOSITORY_FRAGMENT,
    data,
  });
};

const renderStarButton = (id, viewerHasStarred) => {
  const mutation = viewerHasStarred ? REMOVE_STAR_MUTATION : ADD_STAR_MUTATION;
  const buttonText = viewerHasStarred ? 'Remove Star' : 'Add Star';

  return (
    <div>
      <Mutation
        mutation={mutation}
        variables={{ id }}
        update={(...args) => updateRepoStarCount(id, viewerHasStarred, ...args)}
      >
        {(runMutation, { loading }) => {
          return (
            loading ? <Loading /> : <button onClick={runMutation}>{buttonText}</button>
          );
        }}
      </Mutation>
    </div>
  );
};

const Repo = ({ id, name, url, primaryLanguage, stargazers, descriptionHTML, viewerHasStarred }) => {
  return (
    <li>
      <h2>
        <a href={url} target="_blank" rel="noopener">{name}</a>
      </h2>
      <div>
        {stargazers.totalCount} Stars
        {renderStarButton(id, viewerHasStarred)}
      </div>
      <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
      {primaryLanguage && (
        <div>
          Language: {primaryLanguage.name}
        </div>
      )}
    </li>
  )
};

export default Repo;
