const element1 = document.querySelector('.element1');
const observer1 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element1.style.backgroundColor = 'red';
      } else {
        element1.style.backgroundColor = 'blue';
      }
    })
  },
  {
    threshold: 1.0,
  },
);
observer1.observe(element1);

const element2 = document.querySelector('.element2');
const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      element2.style.background = `rgba(255, 0, 0, ${entry.intersectionRatio})`;
    });
  },
  {
    threshold: Array.from(new Array(100)).map((_, i) => i * 0.01),
  },
);
observer2.observe(element2);
