---
to: src/components/<%= h.changeCase.camel(name) %>/<%= h.changeCase.pascal(name) %>.stories.tsx
---
<%
  pascalName = h.changeCase.pascal(name)
%>
import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import <%= pascalName %> from './<%= pascalName %>';

export default {
  title: 'Components/<%= pascalName %>',
  component: <%= pascalName %>,
} as Meta;

export const Default = () => {
  return <<%= pascalName %> />;
}
