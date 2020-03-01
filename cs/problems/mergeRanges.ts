/**
 * Merge Ranges
 *
 * Source: https://www.interviewcake.com/question/javascript/merging-ranges
 *
 * TODO: Figure out how to get time complexity to O(n*log(n))
 */

interface Range {
  start: number,
  end: number,
}

const mergeRanges = (ranges: Range[]): Range[] => {
  const findMatchingRange = (searchRange: Range, existingRanges: Range[]): Range | undefined => {
    return existingRanges.find((existingRange) => {
      const start1 = existingRange.start
      const end1 = existingRange.end
      const start2 = searchRange.start
      const end2 = searchRange.end

      return (start2 >= start1 && start2 <= end1) || (start1 >= start2 && start1 <= end2)
    })
  }

  return ranges.reduce((mergedRanges, currentRange) => {
    const existingRange = findMatchingRange(currentRange, mergedRanges)
    if (existingRange) {
      const newStart = Math.min(currentRange.start, existingRange.start)
      const newEnd = Math.max(currentRange.end, existingRange.end)
      existingRange.start = newStart
      existingRange.end = newEnd
    } else {
      mergedRanges.push(currentRange)
    }
    return mergedRanges
  }, [] as Range[])
}

export default mergeRanges
