---
to: src/components/<%= h.changeCase.camel(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
<%
  pascalName = h.changeCase.pascal(name)
%>
import React from 'react';

import styles from './<%= pascalName %>.module.css';

interface Props {

}

function <%= pascalName %>({ /*...*/ }: Props): React.ReactElement {
  return <div />;
}

export default <%= pascalName %>;
