export interface Options {
  distancePx: number,
  durationMs: number,
}

function animateLinear(element: HTMLElement, options: Options): void {
  const pixelsPerSec = options.distancePx / (options.durationMs / 1000);
  let distanceTraveled = 0;
  let previousFrameTime: DOMHighResTimeStamp;

  const initialWillChangeValue = element.style.willChange;
  element.style.willChange = 'transform';

  const animate = (timestamp: DOMHighResTimeStamp): void => {
    if (previousFrameTime === undefined) {
      previousFrameTime = timestamp;
      window.requestAnimationFrame(animate);
      return;
    }

    // e.g. 1000 / 16.6 = 60ish
    const currentFPS = 1000 / (timestamp - previousFrameTime);
    previousFrameTime = timestamp;

    const distanceToTravel = pixelsPerSec / currentFPS;
    distanceTraveled += distanceToTravel;

    const currentValue = Math.min(options.distancePx, distanceTraveled);
    element.style.transform = `translateX(${currentValue}px)`;

    if (currentValue < options.distancePx) {
      window.requestAnimationFrame(animate);
    } else {
      element.style.willChange = initialWillChangeValue;
    }
  };

  window.requestAnimationFrame(animate);
}

export default animateLinear;
