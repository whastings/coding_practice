import React from 'react';
import Reactions from './Reactions';

const Repository = ({ onFetchMoreIssues, repository }) => {
  const issueEdges = repository.issues.edges;
  const { endCursor } = repository.issues.pageInfo;

  return (
    <div>
      <h3>In Repository:</h3>
      <a href={repository.url}>{repository.name}</a>

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
      <button onClick={() => onFetchMoreIssues(endCursor)}>More</button>
    </div>
  );
};

export default Repository;
