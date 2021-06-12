import React from 'react';

interface Result {
  Dialog: React.FunctionComponent;
}

function useDialog(contents: React.ReactElement): Result {
  const Dialog = () => {
    return <div>{contents}</div>;
  };

  return { Dialog };
}

export default useDialog;
