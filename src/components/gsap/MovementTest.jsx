import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MovementTest = () => {
  const square = useRef();
  const x = useRef(0);
  const y = useRef(0);
  const container = useRef();
  const stepX = useRef(0);
  const stepY = useRef(0);
  const xCount = useRef(0);
  const yCount = useRef(0);

  const updateStepSize = () => {
    if (container.current) {
      stepX.current = container.current.offsetWidth / 12;
      stepY.current = container.current.offsetHeight / 6;
    }
  };

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
      gsap.to(square.current, { duration: 2, x: x.current, y: y.current });
      console.log(stepX.current);
    };

    gsap.to(square.current, { duration: 0, x: 0, y: 0 });

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        ref={container}
        className="bg-gray-900 h-screen w-full flex overflow-hidden"
      >
        <div
          ref={square}
          className="w-1/12 h-1/6 bg-blue-500 rounded-full"
        ></div>
      </div>
    </>
  );
};

export default MovementTest;
