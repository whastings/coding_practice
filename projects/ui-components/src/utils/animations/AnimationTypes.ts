export type KeyframesGenerator = (
  startRect: DOMRect,
  endRect: DOMRect,
) => { keyframes: Keyframe[]; options: { duration: number } };
