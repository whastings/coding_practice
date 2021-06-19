/**
 * Based on: https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
 */
function isNullOrUndefined<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value != null;
}

export default isNullOrUndefined;
