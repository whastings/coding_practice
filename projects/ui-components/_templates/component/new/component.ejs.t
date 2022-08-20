---
to: src/components/<%= h.changeCase.camel(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
<%- include(`${templates}/shared/component`, {name: name}) %>
