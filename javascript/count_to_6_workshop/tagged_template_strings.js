var username = process.argv[2],
    message = process.argv[3],
    rHTML = /<|>|&|'|"/g;

function escapeMessage(stringParts, ...replacements) {
  var output = stringParts[0],
      length = replacements.length,
      i,
      replacement;

  for (i = 0; i < length; i++) {
    replacement = replacements[i].replace(rHTML, escapeChar);
    output += replacement + stringParts[i + 1];
  }

  return output;
}

function escapeChar(char) {
  var escaped;

  switch(char) {
    case '\'':
      escaped = '&#39;';
      break;
    case '"':
      escaped = '&quot;';
      break;
    case '<':
      escaped = '&lt;';
      break;
    case '>':
      escaped = '&gt;';
      break;
    case '&':
      escaped = '&amp;';
      break;
  }

  return escaped;
}

var output = escapeMessage`<b>${username} says</b>: "${message}"`;
console.log(output);
