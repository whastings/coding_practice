import React from 'react';

const RepoPathForm = ({ onChange, onSubmit, repoPath }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="repo-path">
        Show open issues for repo:
      </label>
      <input
        id="repo-path"
        onChange={handleChange}
        value={repoPath}
      />
      <button>Submit</button>
    </form>
  );
}

export default RepoPathForm;
