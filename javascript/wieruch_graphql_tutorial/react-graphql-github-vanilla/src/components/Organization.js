import React from 'react';

import Repository from './Repository';

const Organization = ({ onFetchMoreIssues, organization }) => {
  return (
    <div>
      <h2>Issues from Organization:</h2>
      <a href={organization.url}>{organization.name}</a>
      <Repository repository={organization.repository} onFetchMoreIssues={onFetchMoreIssues} />
    </div>
  );
};

export default Organization;
