import React from 'react';

const Errors = ({ errors }) => {
  return (
    <div>
      <h2>Something Went Wrong:</h2>
      <ul>
        {errors.map(error => <li key={error.message}>{error.message}</li>)}
      </ul>
    </div>
  );
};

export default Errors;
