import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Loading from './Loading';

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

const renderStarButton = (id, viewerHasStarred) => {
  const mutation = viewerHasStarred ? REMOVE_STAR_MUTATION : ADD_STAR_MUTATION;
  const buttonText = viewerHasStarred ? 'Remove Star' : 'Add Star';

  return (
    <div>
      <Mutation mutation={mutation} variables={{ id }}>
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
