export interface Options {
  distancePx: number,
  durationMs: number,
}

const FRAME_DURATION = 16.6;

function animateLinear(element: HTMLElement, options: Options): void {
  let startTime: DOMHighResTimeStamp;
  let distanceTraveled = 0;

  const animate = (timestamp: DOMHighResTimeStamp): void => {
    if (startTime === undefined) {
      startTime = timestamp;
    }

    const elapsedTime = timestamp - startTime;
    const timeRemaining = options.durationMs - elapsedTime;
    const distanceRemaining = options.distancePx - distanceTraveled;
    const framesRemaining = timeRemaining / FRAME_DURATION;
    const distanceToTravel = distanceRemaining / framesRemaining;
    distanceTraveled += distanceToTravel;
    const currentValue = Math.min(options.distancePx, distanceTraveled);

    element.style.transform = `translateX(${currentValue}px)`;

    if (currentValue < options.distancePx) {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
}

export default animateLinear;
