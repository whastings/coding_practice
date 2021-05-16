import React from 'react';

import { UniqueIDContextProvider } from './uniqueID/UniqueIDContext';

function wrapStory(StoryComponent: React.ComponentType) {
  return (
    <UniqueIDContextProvider>
      <StoryComponent />
    </UniqueIDContextProvider>
  );
}

export default wrapStory;
