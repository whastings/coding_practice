import { useCallback } from 'react';

import { KeyframesGenerator } from './AnimationTypes';

function useLinearKeyframesGenerator(duration: number): KeyframesGenerator {
  return useCallback(
    (startRect, endRect) => {
      const diffX = startRect.x - endRect.x;
      const diffY = startRect.y - endRect.y;
      const keyframes = [
        {
          transform: new DOMMatrix().translateSelf(diffX, diffY).toString(),
        },
        {
          transform: new DOMMatrix().translateSelf(0, 0).toString(),
        },
      ];
      return { options: { duration }, keyframes };
    },
    [duration],
  );
}

export default useLinearKeyframesGenerator;
