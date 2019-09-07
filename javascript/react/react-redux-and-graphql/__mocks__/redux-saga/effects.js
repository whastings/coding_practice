const otherEffects = require('@redux-saga/core/effects')

const delay = jest.fn().mockImplementation(() => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
})

module.exports = { ...otherEffects, delay }
