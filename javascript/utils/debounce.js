const debounce = (fn, waitTime) => {
  let timerId

  return function(...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn.apply(this, args), waitTime)
  }
}

export default debounce
