import React from 'react';
import immutable from 'object-path-immutable';

import Loading from './Loading';
import RepoList from './RepoList';

const handleFetchMoreRepos = (queryRoot, fetchMore, lastEndCursor) => {
  fetchMore({
    variables: {
      cursor: lastEndCursor,
    },
    updateQuery(prevResult, { fetchMoreResult }) {
      if (!fetchMoreResult) {
        return prevResult;
      }
      return immutable.assign(prevResult, `${queryRoot}.repositories`, {
        ...fetchMoreResult[queryRoot].repositories,
        edges: [
          ...prevResult[queryRoot].repositories.edges,
          ...fetchMoreResult[queryRoot].repositories.edges,
        ],
      })
    },
  })
};

const ReposLoader = ({ data, queryRoot, loading, fetchMore }) => {
  const dataRoot = data[queryRoot];
  const { endCursor, hasNextPage } = dataRoot.repositories.pageInfo;
  const repos = dataRoot.repositories.edges.map(edge => edge.node);
  return (
    <div>
      <RepoList repos={repos} />
      {hasNextPage && (
        <button type="button" onClick={() => handleFetchMoreRepos(queryRoot, fetchMore, endCursor)}>
          Load More Repos
        </button>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default ReposLoader;
