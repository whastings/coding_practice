import React from 'react';
import Reactions from './Reactions';

const Repository = ({ onFetchMoreIssues, onStar, onUnstar, repository }) => {
  const issueEdges = repository.issues.edges;
  const { endCursor, hasNextPage } = repository.issues.pageInfo;
  const { viewerHasStarred } = repository;

  return (
    <div>
      <h3>In Repository:</h3>
      <a href={repository.url}>{repository.name}</a>
      <div>
        {viewerHasStarred ?
          <button onClick={onUnstar}>Unstar</button> : <button onClick={onStar}>Star</button>}
      </div>

      <ul>
        {issueEdges.map(({ node }) => (
          <li key={node.id}>
            <a href={node.url}>{node.title}</a>

            <ul>
              <Reactions reactions={node.reactions.edges.map(edge => edge.node)} />
            </ul>
          </li>
        ))}
      </ul>
      <hr />
      {hasNextPage && <button onClick={() => onFetchMoreIssues(endCursor)}>More</button>}
    </div>
  );
};

export default Repository;
