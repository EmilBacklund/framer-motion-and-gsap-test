import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Bullets = ({ x, y, angle }) => {
  const bulletRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bulletRef.current,
      { x: 0, y: 0 },
      {
        x: Math.cos(angle * (Math.PI / 180)) * 2000,
        y: Math.sin(angle * (Math.PI / 180)) * 2000,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => bulletRef.current.remove(),
      }
    );
  }, [angle]);

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
