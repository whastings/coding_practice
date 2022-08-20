---
to: src/components/<%= h.changeCase.camel(parent) %>/<%= h.changeCase.pascal(name) %>.tsx
---
<%- include(`${templates}/shared/component`, {name: name}) %>
