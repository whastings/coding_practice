import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import DraggableList from './DraggableList';
import DraggableListItem from './DraggableListItem';

export default {
  title: 'Components/DraggableList',
  component: DraggableList,
} as Meta;

export const Default = () => (
  <div style={{ width: 200 }}>
    <DraggableList>
      <DraggableListItem>Item 1</DraggableListItem>
      <DraggableListItem>Item 2</DraggableListItem>
      <DraggableListItem>Item 3</DraggableListItem>
      <DraggableListItem>Item 4</DraggableListItem>
    </DraggableList>
  </div>
);
