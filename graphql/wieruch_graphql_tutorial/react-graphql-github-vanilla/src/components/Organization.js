import React from 'react';

import Repository from './Repository';

const Organization = ({ onFetchMoreIssues, onStarRepo, onUnstarRepo, organization }) => {
  return (
    <div>
      <h2>Issues from Organization:</h2>
      <a href={organization.url}>{organization.name}</a>
      <Repository
        repository={organization.repository}
        onFetchMoreIssues={onFetchMoreIssues}
        onStar={onStarRepo}
        onUnstar={onUnstarRepo}
      />
    </div>
  );
};

export default Organization;
