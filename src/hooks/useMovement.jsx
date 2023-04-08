import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const useMovement = (square, container, stepX, stepY) => {
  const xCount = useRef(0);
  const yCount = useRef(0);
  const x = useRef(0);
  const y = useRef(0);

  const updateStepSize = () => {
    if (container.current) {
      stepX.current = container.current.offsetWidth / 12;
      stepY.current = container.current.offsetHeight / 6;
    }
  };

  useEffect(() => {
    updateStepSize();

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      switch (key) {
        case 'w':
          if (yCount.current !== 0) {
            yCount.current--;
            y.current -= stepY.current;
          }
          break;
        case 's':
          if (yCount.current < 5) {
            yCount.current++;
            y.current += stepY.current;
          }
          break;
        case 'a':
          if (xCount.current !== 0) {
            xCount.current--;
            x.current -= stepX.current;
          }
          break;
        case 'd':
          if (xCount.current < 11) {
            xCount.current++;
            x.current += stepX.current;
          }
          break;
        default:
          break;
      }
      gsap.to(square.current, { duration: 1, x: x.current, y: y.current });
      console.log(stepX.current);
    };

    gsap.to(square.current, { duration: 0, x: 0, y: 0 });

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateStepSize();
    });

    if (container.current) {
      resizeObserver.observe(container.current);
    }

    return () => {
      if (container.current) {
        resizeObserver.unobserve(container.current);
      }
    };
  }, [container]);
};

export default useMovement;
