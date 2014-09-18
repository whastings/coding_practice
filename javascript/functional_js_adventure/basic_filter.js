function getShortMessages(messages) {
  return messages.filter(function(messageObj) {
    return messageObj.message.length < 50;
  })
  .map(function(messageObj) {
    return messageObj.message;
  });
}

module.exports = getShortMessages;
