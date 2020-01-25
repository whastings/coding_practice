const range = (startNum: number, endNum: number): number[] => {
  const array = []
  for (let i = startNum; i <= endNum; i++) {
    array.push(i)
  }

  return array
}

export default range
