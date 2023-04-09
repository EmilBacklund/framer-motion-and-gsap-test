import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Bullets = ({ id, x, y, angle, bulletRefsMap }) => {
  const bulletRef = useRef(null);

  useEffect(() => {
    bulletRefsMap[id] = bulletRef;

    gsap.fromTo(
      bulletRef.current,
      { x: 0, y: 0 },
      {
        x: Math.cos(angle * (Math.PI / 180)) * 2000,
        y: Math.sin(angle * (Math.PI / 180)) * 2000,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => {
          if (bulletRef.current) {
            bulletRef.current.dataset.finished = 'true';
          }
        },
      }
    );
  }, [angle, bulletRefsMap, id]);

  const bulletStyling = {
    left: `${x}px`,
    top: `${y}px`,
    transform: `rotate(${angle}deg)`,
  };

  return (
    <img
      className="absolute select-none"
      ref={bulletRef}
      style={bulletStyling}
      src="images/revolverBullet2.svg"
      alt="bullet"
    />
  );
};

export default Bullets;
