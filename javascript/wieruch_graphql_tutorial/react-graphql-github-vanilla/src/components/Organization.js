import React from 'react';

import Repository from './Repository';

const Organization = ({ organization }) => {
  return (
    <div>
      <h2>Issues from Organization:</h2>
      <a href={organization.url}>{organization.name}</a>
      <Repository repository={organization.repository} />
    </div>
  );
};

export default Organization;
