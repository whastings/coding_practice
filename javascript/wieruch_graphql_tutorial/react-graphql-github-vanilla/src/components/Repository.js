import React from 'react';

const Repository = ({ repository }) => {
  const issueEdges = repository.issues.edges;

  return (
    <div>
      <h3>In Repository:</h3>
      <a href={repository.url}>{repository.name}</a>

      <ul>
        {issueEdges.map(({ node }) => (
          <li key={node.id}>
            <a href={node.url}>{node.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repository;
