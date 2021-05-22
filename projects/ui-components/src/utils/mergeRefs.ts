import React from 'react';

// TODO: Support functional refs
function mergeRefs<T>(...refs: React.MutableRefObject<T>[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      ref.current = value;
    });
  };
}

export default mergeRefs;
