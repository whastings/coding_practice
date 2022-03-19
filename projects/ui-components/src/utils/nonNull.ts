function nonNull<TValue>(value: TValue | null): TValue {
  if (value == null) {
    throw new Error('Unexpected null encountered');
  }

  return value;
}

export default nonNull;
