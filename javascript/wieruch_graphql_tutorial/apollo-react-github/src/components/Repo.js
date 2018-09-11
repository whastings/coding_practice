import React from 'react';

const Repo = ({ name, url, primaryLanguage, stargazers, descriptionHTML }) => {
  return (
    <li>
      <h2>
        <a href={url} target="_blank" rel="noopener">{name}</a>
      </h2>
      <div>
        {stargazers.totalCount} Stars
      </div>
      <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
      {primaryLanguage && (
        <div>
          Language: {primaryLanguage.name}
        </div>
      )}
    </li>
  )
};

export default Repo;
