import React from 'react';

const Reactions = ({ reactions }) => {
  return (
    <ul>
      {reactions.map(reaction => <li key={reaction.id}>{reaction.content}</li>)}
    </ul>
  );
};

export default Reactions;
