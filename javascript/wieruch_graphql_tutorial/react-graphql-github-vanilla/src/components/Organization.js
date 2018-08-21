import React from 'react';

const Organization = ({ organization }) => {
  return (
    <div>
      <h2>Issues from Organization:</h2>
      <a href={organization.url}>{organization.name}</a>
    </div>
  );
};

export default Organization;
