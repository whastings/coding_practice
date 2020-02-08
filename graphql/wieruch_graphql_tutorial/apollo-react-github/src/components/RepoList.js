import React, { Fragment } from 'react';

import Repo from './Repo';

const RepoList = ({ repos }) => {
  return (
    <Fragment>
      <h2>Repos</h2>
      <ul>
        {repos.map(repo => (
          <Repo {...repo} key={repo.id} />
        ))}
      </ul>
    </Fragment>
  )
};

export default RepoList;
