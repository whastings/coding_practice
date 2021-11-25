import { useCallback } from 'react';

import { KeyframesGenerator } from './AnimationTypes';

function useLinearKeyframesGenerator(): KeyframesGenerator {
  return useCallback((startRect, endRect) => {
    return [
      {
        transform: new DOMMatrix()
          .translateSelf(startRect.x, startRect.y)
          .toString(),
      },
      {
        transform: new DOMMatrix()
          .translateSelf(endRect.x, endRect.y)
          .toString(),
      },
    ];
  }, []);
}

export default useLinearKeyframesGenerator;
