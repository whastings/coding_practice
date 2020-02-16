const partiallyApply = (fn) => {
  function intermediate(pastArgs, ...newArgs) {
    const allArgs = pastArgs.concat(newArgs)
    if (allArgs.length >= fn.length) {
      return fn(...allArgs)
    }
    return intermediate.bind(null, allArgs)
  }

  return intermediate.bind(null, [])
}

export default partiallyApply
