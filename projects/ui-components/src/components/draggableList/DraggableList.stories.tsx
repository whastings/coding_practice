import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import DraggableList from './DraggableList';

export default {
  title: 'Components/DraggableList',
  component: DraggableList,
} as Meta;

export const Default = () => {
  const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  return (
    <div style={{ width: 200 }}>
      <DraggableList
        list={list}
        onUpdateList={setList}
        renderItem={(item) => item}
      />
    </div>
  );
};
